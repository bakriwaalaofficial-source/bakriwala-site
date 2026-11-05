import { NextResponse } from 'next/server';
import { getQueries, updateQuery, deleteQuery } from '@/lib/storage';

export async function GET() {
  try {
    const queries = await getQueries();
    return NextResponse.json({
      success: true,
      data: queries,
      total: queries.length,
      unreadCount: queries.filter((q) => q.status === 'unread').length,
    });
  } catch (error: any) {
    console.error('[API /api/admin/queries GET] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch queries' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Query ID and new status are required.' },
        { status: 400 }
      );
    }

    const updated = await updateQuery(id, { status });
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Query not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    console.error('[API /api/admin/queries PATCH] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update query status' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Query ID is required in URL parameter ?id=' },
        { status: 400 }
      );
    }

    const deleted = await deleteQuery(id);
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Query not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: 'Query deleted successfully' });
  } catch (error: any) {
    console.error('[API /api/admin/queries DELETE] error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete query' },
      { status: 500 }
    );
  }
}
