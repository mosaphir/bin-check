import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import csvParser from 'csv-parser';

// Define the structure of the bin data
interface BinData {
  BIN: string;
  Brand: string;
  Type: string;
  Category: string;
  Issuer: string;
  IssuerPhone: string;
  IssuerUrl: string;
  isoCode2: string;
  isoCode3: string;
  CountryName: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const bin = searchParams.get('bin');

  if (!bin) {
    return NextResponse.json({ error: 'BIN is required' }, { status: 400 });
  }

  try {
    const filePath = path.join(process.cwd(), 'public', 'bin-data.csv');
    const bins = await parseCSV(filePath);

    const binData = bins.find((binEntry: BinData) => binEntry.BIN === bin);

    if (!binData) {
      return NextResponse.json({ error: 'BIN not found' }, { status: 404 });
    }

    return NextResponse.json(binData);
  } catch (err) {
    console.error('Error reading the CSV file:', err);
    return NextResponse.json({ error: 'Error fetching data. Please try again later.' }, { status: 500 });
  }
}

const parseCSV = (filePath: string): Promise<BinData[]> => {
  return new Promise((resolve, reject) => {
    const results: BinData[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data as BinData))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};
