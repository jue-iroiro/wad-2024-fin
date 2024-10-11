// app/api/customer/route.js
import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

export async function GET(req) {
  await dbConnect();
  try {
    const customers = await Customer.find({});
    return new Response(JSON.stringify({ success: true, data: customers }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const customer = await Customer.create(body);
    return new Response(JSON.stringify({ success: true, data: customer }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}