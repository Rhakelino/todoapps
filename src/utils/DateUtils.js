export const DateUtils = {
  formatDateKey: (date) => {
    // Use local timezone to ensure consistent date key
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().split('T')[0];
  },

  formatDisplayDate: (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('id-ID', options);
  },

  getDayName: (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    // Normalize dates to remove time component for accurate comparison
    const normalizeDate = (d) => {
      const normalized = new Date(d);
      normalized.setHours(0, 0, 0, 0);
      return normalized;
    };

    const normalizedDate = normalizeDate(date);
    const normalizedToday = normalizeDate(today);
    const normalizedTomorrow = normalizeDate(tomorrow);
    const normalizedYesterday = normalizeDate(yesterday);

    if (normalizedDate.getTime() === normalizedToday.getTime()) {
      return 'Hari Ini';
    } else if (normalizedDate.getTime() === normalizedTomorrow.getTime()) {
      return 'Besok';
    } else if (normalizedDate.getTime() === normalizedYesterday.getTime()) {
      return 'Kemarin';
    } else {
      return date.toLocaleDateString('id-ID', { weekday: 'long' });
    }
  }
};