import { addSeconds, format, parseISO } from "date-fns";

export function formatRecordDate(
  dateLesson: string,
  lessonLength: number
): string {
  const startDate = new Date(dateLesson);
  const endDate = addSeconds(startDate, lessonLength);

  const formattedStartDate = format(startDate, "EEE, dd/MM/yyyy, HH:mm");
  const formattedEndDate = format(endDate, "HH:mm");

  return `${formattedStartDate} - ${formattedEndDate}`;
}
export function formatDateToDayMonthYear(inputDate: string): string {
  const parsedDate = parseISO(inputDate);
  return format(parsedDate, "dd/MM/yyyy");
}

export function parseDirectionsAndCount(input: string): {
  directions: string[];
  count: number;
} {
  const regex = /(.+)\s\(x(\d+)\)$/;
  const match = input.match(regex);

  if (match) {
    const directions = match[1]
      .split(", ")
      .map((direction) => direction.trim());
    const count = parseInt(match[2], 10);
    return { directions, count };
  } else {
    throw new Error("Invalid input format");
  }
}

export function secondsToHoursOrMinutes(seconds: number | string): string {
  if (typeof seconds === "string") {
    seconds = parseInt(seconds);
  }
  let time;
  if (seconds >= 3600) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    if (minutes === 0) {
      time = hours + " hour";
    } else {
      time = hours + " hour " + minutes + " minute";
    }
  } else {
    time = Math.floor(seconds / 60) + " minute";
  }
  return time;
}

export const dateToISOString = (date: Date) =>
  date
    .toISOString()
    .replace(/T[\d][\d]:[\d][\d]:[\d][\d].[\d][\d][\d]/, "T00:00:00.000");

export function computeEndTime(timeFrom: string, seanceLength: number): string {
  const [hours, minutes] = timeFrom.split(":").map(Number);

  const date = new Date();
  date.setHours(hours, minutes, 0);

  date.setSeconds(date.getSeconds() + seanceLength);

  const endHours = date.getHours().toString().padStart(2, "0");
  const endMinutes = date.getMinutes().toString().padStart(2, "0");

  return `${endHours}:${endMinutes}`;
}

export function adjustDate(inputDate: string, time: string): string {
  let date = new Date(inputDate);
  const [hours, minutes] = time.split(":").map(Number);
  date.setUTCHours(hours, minutes, 0, 0);
  return date.toISOString().split(".")[0];
}
