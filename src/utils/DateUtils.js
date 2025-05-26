export const DateUtils = {
  formatDateKey: (date) => date.toISOString().split('T')[0],

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

    // Mendapatkan jam saat ini (jam 00:00 dianggap sebagai pergantian hari)
    const currentHour = today.getHours();

    // Logika pergantian hari pada jam 12 tengah malam
    if (DateUtils.formatDateKey(date) === DateUtils.formatDateKey(today)) {
      return 'Hari Ini';  // Menampilkan 'Hari Ini' terlepas dari jam
    } else if (DateUtils.formatDateKey(date) === DateUtils.formatDateKey(tomorrow)) {
      return 'Besok';
    } else if (DateUtils.formatDateKey(date) === DateUtils.formatDateKey(yesterday)) {
      return 'Kemarin';
    } else {
      return date.toLocaleDateString('id-ID', { weekday: 'long' });
    }
  }
};
