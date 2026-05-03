import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.nextUrl);
  const secret = searchParams.get('secret');
  const tag = searchParams.get('tag');

  if (secret !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json({ message: 'Tag parameter is required' }, { status: 400 });
  }

  try {
    revalidateTag(tag, 'max');
    return NextResponse.json({ revalidated: true, now: Date.now(), tag });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
