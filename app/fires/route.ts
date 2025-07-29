import { XMLParser } from "fast-xml-parser";
import { NextResponse } from "next/server";

const parser = new XMLParser();

export type Fire = {
  id: number;
  title: string;
  description: string;
  link: string;
  latitude: number;
  longitude: number;
  state: string;
};

export async function GET() {
  const res = await fetch("https://inciweb.wildfire.gov/incidents/rss.xml");
  const text = await res.text();
  const feed = await parser.parse(text);
  const fires = [];
  for (const item of feed.rss.channel.item) {
    console.log(item);
    const fire = parseFire(item);
    console.log(fire);
    if (fire.state.toLowerCase() === "colorado") {
      fires.push(fire);
    }
  }
  return NextResponse.json(fires);
}

function parseFire(fire: any): Fire {
  return {
    id: parseInt(fire.guid),
    title: fire.title,
    description:
      fire.description.match(/overview:([^\n]+)/i)?.[1]?.trim() ||
      "No information available.",
    link: fire.link,
    state: fire.description.match(/state:([^\n]+)/i)?.[1]?.trim() || "Unknown",
    latitude: parseCoordinate(
      fire.description.match(/latitude:([^a-z]+)/i)?.[1] || "0"
    ),
    longitude: -parseCoordinate(
      fire.description.match(/longitude:([^a-z]+)/i)?.[1] || "0"
    ),
  };
}

function parseCoordinate(text: string): number {
  const [degrees, minutes, seconds] = text.trim().split(" ");
  return (
    (parseFloat(degrees) || 0) +
    (parseFloat(minutes) || 0) / 60 +
    (parseFloat(seconds) || 0) / 3600
  );
}
