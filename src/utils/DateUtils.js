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

    // Mendapatkan jam saat ini untuk memeriksa apakah sudah melewati tengah malam
    const currentHour = today.getHours();
    const currentDate = today.getDate();

    // Jika sudah lewat jam tengah malam (00:00) dan tanggal sudah berganti
    if (currentHour === 0 && currentDate !== new Date().getDate()) {
      return 'Hari Ini';
    }

    // Logika untuk menampilkan 'Hari Ini', 'Besok', 'Kemarin'
    if (DateUtils.formatDateKey(date) === DateUtils.formatDateKey(today)) {
      return 'Hari Ini';
    } else if (DateUtils.formatDateKey(date) === DateUtils.formatDateKey(tomorrow)) {
      return 'Besok';
    } else if (DateUtils.formatDateKey(date) === DateUtils.formatDateKey(yesterday)) {
      return 'Kemarin';
    } else {
      return date.toLocaleDateString('id-ID', { weekday: 'long' });
    }
  }
};
