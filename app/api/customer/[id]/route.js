// app/api/customer/[id]/route.js
import dbConnect from '@/lib/db';
import Customer from '@/models/Customer';

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return new Response(JSON.stringify({ success: false, error: 'Customer not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, data: customer }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}


export async function PUT(req, { params }) {
    await dbConnect();
    const { id } = params;
  
    try {
      const body = await req.json();
      const customer = await Customer.findByIdAndUpdate(id, body, { new: true, runValidators: true });
      if (!customer) {
        return new Response(JSON.stringify({ success: false, error: 'Customer not found' }), { status: 404 });
      }
      return new Response(JSON.stringify({ success: true, data: customer }), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
    }
  }

export async function PATCH(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const body = await req.json();
    const customer = await Customer.findByIdAndUpdate(id, body, { new: true });
    if (!customer) {
      return new Response(JSON.stringify({ success: false, error: 'Customer not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, data: customer }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return new Response(JSON.stringify({ success: false, error: 'Customer not found' }), { status: 404 });
    }
    return new Response(JSON.stringify({ success: true, data: {} }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { status: 400 });
  }
}