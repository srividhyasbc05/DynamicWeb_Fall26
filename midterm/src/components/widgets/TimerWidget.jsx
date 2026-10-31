import { useState, useEffect } from 'react';

const TimerWidget = () => {
  // Store the editable duration
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  // Store how much time is left in seconds
  const [remainingSeconds, setRemainingSeconds] = useState(25 * 60);

  // if it's running we don't allow the user to edit the time fields.
  const [isRunning, setIsRunning] = useState(false);

  // Convert the remaining total seconds into hours, minutes, and seconds.
  const displayHours = Math.floor(remainingSeconds / 3600);
  const displayMinutes = Math.floor((remainingSeconds % 3600) / 60);
  const displaySeconds = remainingSeconds % 60;

  // Handle edits to the time fields.
  const handleTimeChange = (field, value) => {
    // Don't allow negative values or values above 99 hours / 59 minutes / 59 seconds.
    const limits = {
      hours: 99,
      minutes: 59,
      seconds: 59,
    };

    // Convert the input string into a number and keep it within the allowed range.
    const parsedValue = Math.min(
      limits[field],
      Math.max(0, Number(value) || 0)
    );

    // Start with the time currently displayed.
    // This also means editing after pausing preserves the other displayed values.
    let newHours = displayHours;
    let newMinutes = displayMinutes;
    let newSeconds = displaySeconds;

    // Change only the field the user edited.
    if (field === 'hours') newHours = parsedValue;
    if (field === 'minutes') newMinutes = parsedValue;
    if (field === 'seconds') newSeconds = parsedValue;

    // Update the configured duration.
    setHours(newHours);
    setMinutes(newMinutes);
    setSeconds(newSeconds);

    // Update the countdown to match the edited time.
    // Store time as total seconds so the countdown is easy to calculate.
    setRemainingSeconds(
      newHours * 3600 + newMinutes * 60 + newSeconds
    );
  };

  // Play: start counting down, provided there is time left.
  const handlePlay = () => {
    if (remainingSeconds > 0) {
      setIsRunning(true);
    }
  };

  // Pause: stop the countdown without resetting the remaining time.
  const handlePause = () => {
    setIsRunning(false);
  };

  // Restart: stop the timer and restore the configured duration.
  const handleRestart = () => {
    setIsRunning(false);
    setRemainingSeconds(hours * 3600 + minutes * 60 + seconds);
  };

  // useEffect runs the interval when isRunning becomes true.
  useEffect(() => {
    // If the timer isn't running, don't create an interval.
    if (!isRunning) return;

    // Every 1000 milliseconds (1 second), subtract one second.
    const intervalId = setInterval(() => {
      setRemainingSeconds((previousSeconds) =>
        Math.max(0, previousSeconds - 1)
      );
    }, 1000);

    // Clean up the interval when the timer pauses or the component unmounts.
    // This prevents multiple countdowns from running at once.
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Stop the timer automatically when the countdown reaches zero.
  useEffect(() => {
    if (remainingSeconds === 0) {
      setIsRunning(false);
    }
  }, [remainingSeconds]);

  return (
    <section className="rounded-xl p-5 shadow-sm">

      {/* Action bar: each button calls its corresponding function. */}
      <div className="mb-6 mt-4 flex gap-2">
        <button
          type="button"
          onClick={handlePlay}
          disabled={isRunning || remainingSeconds === 0}
          className="rounded-lg  px-4 py-2 hover: cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          ▶ Play
        </button>

        <button
          type="button"
          onClick={handlePause}
          disabled={!isRunning}
          className="rounded-lg px-4 py-2 hover: cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          ⏸ Pause
        </button>

        <button
          type="button"
          onClick={handleRestart}
          className="rounded-lg px-4 py-2  hover: cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          ↻ Restart
        </button>
      </div>

      {/* Editable time fields. The values update as the countdown runs. */}
      <div className="flex items-center justify-center gap-2">
        <div className="flex flex-col items-center">
          <input
            type="number"
            min="0"
            max="99"
            aria-label="Hours"
            value={displayHours}
            disabled={isRunning}
            onChange={(event) =>
              handleTimeChange('hours', event.target.value)
            }
            className="w-20 rounded-lg border border-white-300 p-3 text-center text-3xl disabled:bg-gray-100"
          />
          <span className="mt-1 text-sm ">Hours</span>
        </div>

        <span className="text-3xl font-semibold">:</span>

        <div className="flex flex-col items-center">
          <input
            type="number"
            min="0"
            max="59"
            aria-label="Minutes"
            value={displayMinutes}
            disabled={isRunning}
            onChange={(event) =>
              handleTimeChange('minutes', event.target.value)
            }
            className="w-20 rounded-lg border border-white-300 p-3 text-center text-3xl disabled:bg-gray-100"
          />
          <span className="mt-1 text-sm">Minutes</span>
        </div>

        <span className="text-3xl font-semibold">:</span>

        <div className="flex flex-col items-center">
          <input
            type="number"
            min="0"
            max="59"
            aria-label="Seconds"
            value={displaySeconds}
            disabled={isRunning}
            onChange={(event) =>
              handleTimeChange('seconds', event.target.value)
            }
            className="w-20 rounded-lg border border-white-300 p-3 text-center text-3xl disabled:bg-gray-100"
          />
          <span className="mt-1 text-sm ">Seconds</span>
        </div>
      </div>

      {/* Small status message for the user. */}
      <p className="mt-4 text-center text-sm">
        {isRunning
          ? 'Timer running'
          : remainingSeconds === 0
            ? 'Time is up!'
            : 'Edit the time, then press Play'}
      </p>
    </section>
  );
};

export default TimerWidget;