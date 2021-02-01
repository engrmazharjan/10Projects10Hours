  

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  
  const newYear = '7 feb 2021';

  function countDown() {
      const newYearDate = new Date(newYear);
      console.log(newYearDate);
      
      const currentDate = new Date();
      
      // Total Seconds
      const totalSeconds = Math.floor((newYearDate - currentDate) / 1000);
      console.log(totalSeconds);
      
      // Days
      const days = Math.floor(totalSeconds / 3600 / 24);
      
      // Hours
      const hours = Math.floor(totalSeconds / 3600) % 24;

      // Minutes
      const minutes = Math.floor(totalSeconds / 60) % 60;

      // Seconds
      const seconds = Math.floor(totalSeconds % 60);

      console.log(days, hours, minutes,seconds);


      daysEl.innerHTML = formatTime(days);
      hoursEl.innerHTML = formatTime(hours);
      minutesEl.innerHTML = formatTime(minutes);
      secondsEl.innerHTML = formatTime(seconds);
    }

    function formatTime(time) {
      return time < 10 ? `0${time}` : time;
    }
    // Initial Call
    countDown();
    setInterval(countDown, 1000);