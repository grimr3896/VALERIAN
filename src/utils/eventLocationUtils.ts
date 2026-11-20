import { Event } from '../types';

export interface EventPricingBreakdown {
  cardBadgeFee: string;
  cardStandardFee: string;
  standard: string;
  standardLabel: string;
  standardNote: string;
  corner: string;
  cornerLabel: string;
  cornerNote: string;
  thirdTier: string;
  thirdTierLabel: string;
  thirdTierNote: string;
}

export interface EventTimetable {
  timezone: string;
  setupWindow: string;
  doorsOpen: string;
  closesAt: string;
}

/**
 * Determines the accurate local US timezone abbreviation (EST, CST, MST, PST)
 * for the location where an event is set.
 */
export function getLocationTimezone(location: string): string {
  const loc = location.toLowerCase();

  // Pacific Time (NV, CA, WA, OR)
  if (
    /\b(nv|ca|wa|or)\b/.test(loc) ||
    /las vegas|anaheim|tulare|san francisco|reno|wenatchee|portland|washington\b/.test(loc)
  ) {
    // Disambiguate Washington, DC vs Washington State
    if (!loc.includes('washington, dc') && !loc.includes('dc')) {
      return 'PST';
    }
  }

  // Mountain Time (CO, NM, ID, UT, AZ)
  if (
    /\b(co|nm|id|ut|az)\b/.test(loc) ||
    /denver|thornton|albuquerque|caldwell|boise|salt lake/.test(loc)
  ) {
    return 'MST';
  }

  // Central Time (IL, TX, LA, TN, WI, MN, MO)
  if (
    /\b(il|tx|la|tn|wi|mn|mo)\b/.test(loc) ||
    /chicago|austin|waxahachie|new orleans|nashville|clarksville|madison|dallas|houston/.test(loc)
  ) {
    return 'CST';
  }

  // Eastern Time (FL, GA, NC, SC, VA, MD, DC, NJ, NY, CT, MA, NH, OH, MI, IN)
  return 'EST';
}

/**
 * Formats the event's operating hours with its local timezone, avoiding duplicate timezone tags.
 */
export function getLocationHoursLabel(event: Event): string {
  const rawHours = (event.hours || '9:00 AM – 6:00 PM Daily').trim();
  const tz = getLocationTimezone(event.location);
  if (/\b(EST|EDT|CST|CDT|MST|MDT|PST|PDT|ET|CT|MT|PT)\b/i.test(rawHours)) {
    return rawHours;
  }
  return `${rawHours} (${tz})`;
}

function shiftHourString(hourStr: string, deltaHours: number): string {
  const m = hourStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return hourStr.trim();
  let hours = parseInt(m[1], 10);
  const mins = parseInt(m[2], 10);
  const period = m[3].toUpperCase();
  if (period === 'PM' && hours !== 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  let totalMins = hours * 60 + mins + deltaHours * 60;
  totalMins = ((totalMins % (24 * 60)) + 24 * 60) % (24 * 60);

  const newHours24 = Math.floor(totalMins / 60);
  const newMins = totalMins % 60;
  const newPeriod = newHours24 >= 12 ? 'PM' : 'AM';
  const newHours12 = newHours24 % 12 === 0 ? 12 : newHours24 % 12;
  const paddedMins = newMins.toString().padStart(2, '0');
  return `${newHours12}:${paddedMins} ${newPeriod}`;
}

/**
 * Derives an accurate load-in/setup, doors open, and closing timetable
 * matched to the event's hours and location timezone.
 */
export function getLocationTimetable(event: Event): EventTimetable {
  const timezone = getLocationTimezone(event.location);
  const rawHours = event.hours || '9:00 AM – 6:00 PM Daily';
  const rangeMatch = rawHours.match(/(\d{1,2}:\d{2}\s*(?:AM|PM))\s*[–-]\s*(\d{1,2}:\d{2}\s*(?:AM|PM))/i);

  if (rangeMatch) {
    const openTime = rangeMatch[1].toUpperCase();
    const closeTime = rangeMatch[2].toUpperCase();
    const setupStart = shiftHourString(openTime, -2.5);
    const setupEnd = shiftHourString(openTime, -0.5);
    return {
      timezone,
      setupWindow: `${setupStart} – ${setupEnd} ${timezone}`,
      doorsOpen: `${openTime} ${timezone}`,
      closesAt: `${closeTime} ${timezone}`,
    };
  }

  return {
    timezone,
    setupWindow: `7:00 AM – 8:30 AM ${timezone}`,
    doorsOpen: `9:00 AM ${timezone}`,
    closesAt: `6:00 PM ${timezone}`,
  };
}

/**
 * Distinguishes outdoor/food/craft/holiday/heritage festivals & faires
 * from B2B conventions, trade shows, and industry conferences.
 */
export function isFoodOrFestivalEvent(event: Event): boolean {
  const combined = `${event.category} ${event.title}`.toLowerCase();
  return /food|festival|fest\b|faire|market|christmas|holiday|art |arts|craft|vintage|antiques|blossom|horror|music|creator/.test(
    combined
  );
}

/**
 * Computes location- and event-fitted booth pricing tiers.
 * Strictly preserves ev-86 (Holiday Kickoff Food & Vendor Festival 2026) exact Microsoft Form rates.
 */
export function getEventPricingBreakdown(event: Event): EventPricingBreakdown {
  if (event.id === 'ev-86') {
    return {
      cardBadgeFee: '$80–$150 / day',
      cardStandardFee: '$80 / day',
      standard: '$80/day',
      standardLabel: "Standard 10'×10' Booth",
      standardNote: 'Includes 1 table, 2 chairs, 110V power & 2-car parking',
      corner: '$150/day',
      cornerLabel: 'Premium Corner Space',
      cornerNote: "10'×20' Corner/Main St. (10'×10' Corner: $100/day • 10'×20' Large: $120/day)",
      thirdTier: '$150/day',
      thirdTierLabel: 'Food Truck / Mobile Rig',
      thirdTierNote: 'Dedicated 30A/50A electric & greywater access',
    };
  }

  const rawCost = event.cost || '$350 - $700 / Booth';
  const numbers = (rawCost.match(/[\d,]+/g) || [])
    .map((n) => parseInt(n.replace(/,/g, ''), 10))
    .filter((n) => !Number.isNaN(n));

  const minCost = numbers[0] ?? 350;
  const maxCost = numbers[1] ?? Math.round(minCost * 2);
  const rawMid = Math.round((minCost + maxCost) / 2);
  const midCost = minCost >= 1000 ? Math.round(rawMid / 50) * 50 : Math.round(rawMid / 25) * 25;

  const isWeekendUnit = /weekend/i.test(rawCost);
  const isSpaceUnit = /space/i.test(rawCost);
  const unitSuffix = isWeekendUnit ? '/ weekend' : isSpaceUnit ? '/ space' : '/ booth';
  const festivalStyle = isFoodOrFestivalEvent(event);

  return {
    cardBadgeFee: rawCost,
    cardStandardFee: `$${minCost.toLocaleString()} ${unitSuffix}`,
    standard: `$${minCost.toLocaleString()}`,
    standardLabel: "Standard 10'×10' Booth",
    standardNote: festivalStyle
      ? 'Includes 10×10 space, 1 table, 2 chairs, 110V power & parking'
      : 'Standard 10×10 inline exhibitor booth with pipe/drape, 110V drop & badge allocation',
    corner: `$${midCost.toLocaleString()}`,
    cornerLabel: 'Premium Corner Space',
    cornerNote: festivalStyle
      ? "Double aisle exposure, 10'×20' corner canopy footprint"
      : "High-visibility 10'×20' corner pavilion with dual-aisle frontage",
    thirdTier: `$${maxCost.toLocaleString()}`,
    thirdTierLabel: festivalStyle ? 'Food Truck / Mobile Rig' : "20'×20' Island / Pavilion",
    thirdTierNote: festivalStyle
      ? 'Dedicated 30A/50A electric, high-traffic lane & greywater access'
      : 'Anchor island expo footprint with 20A power & priority drayage credentials',
  };
}
