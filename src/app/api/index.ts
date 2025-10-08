import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "db.json");

function readData() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}

function writeData(data: any) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const data = readData();
  return NextResponse.json(data.wallet);
}

export async function POST(req: Request) {
  const newCard = await req.json();
  const data = readData();

  newCard.id = Date.now();
  data.wallet.push(newCard);
  writeData(data);

  return NextResponse.json(newCard);
}

export async function PATCH(req: Request) {
  const updatedCard = await req.json();
  const data = readData();
  const index = data.wallet.findIndex((c: any) => c.id === updatedCard.id);

  if (index === -1)
    return NextResponse.json({ message: "Cartão não encontrado" }, { status: 404 });

  data.wallet[index] = { ...data.wallet[index], ...updatedCard };
  writeData(data);

  return NextResponse.json(data.wallet[index]);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  const data = readData();
  const filtered = data.wallet.filter((c: any) => c.id !== id);
  data.wallet = filtered;
  writeData(data);

  return NextResponse.json({ success: true });
}
