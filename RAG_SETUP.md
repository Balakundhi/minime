# RAG Setup Instructions

This guide will help you set up the Supabase RAG (Retrieval-Augmented Generation) system for the chat feature.

## Prerequisites

- Supabase account (free tier works fine)
- OpenAI API key
- Node.js and npm installed

## Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create a new project
3. Wait for the database to be provisioned

## Step 2: Run Database Schema

1. In your Supabase project dashboard, go to **SQL Editor**
2. Copy the contents of `supabase-schema.sql` from the project root
3. Paste and run the SQL script
4. This will:
   - Enable the `pgvector` extension
   - Create `documents` and `chunks` tables
   - Create the `match_chunks` function for similarity search
   - Add necessary indexes

## Step 3: Update Environment Variables

In your `.env.local` file, ensure you have:

```env
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...  # Optional, for server-side operations
```

## Step 4: Customize Your Content

Edit `content/about-me.md` with your actual information:

- Personal details
- Education background
- Work experience
- Skills
- Projects
- Interests
- Contact information

You can also add more markdown files in the `content/` directory.

## Step 5: Install Dependencies

If not already installed:

```bash
npm install tsx
```

## Step 6: Ingest Content

Run the ingestion script to populate the vector database:

```bash
npx tsx scripts/ingest-content.ts
```

This will:
1. Read all `.md` files from the `content/` directory
2. Chunk the content into smaller pieces
3. Generate embeddings using OpenAI
4. Store chunks and embeddings in Supabase

## Step 7: Test the Chat

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000`
3. Use the "Ask me anything" widget
4. Ask questions like:
   - "What are Sri Charan's skills?"
   - "Tell me about his work experience"
   - "What are his hobbies?"
   - "What projects has he worked on?"

The chat will now use semantic search to retrieve relevant information and answer questions accurately!

## Updating Content

When you update content:

1. Edit the markdown files in `content/`
2. Re-run the ingestion script: `npx tsx scripts/ingest-content.ts`
3. The new content will be added to the database

To clear and re-ingest everything:

1. Uncomment the `await clearDatabase()` line in `scripts/ingest-content.ts`
2. Run the script again

## Troubleshooting

### "Supabase not configured" error
- Check that your environment variables are correct
- Make sure you've restarted the dev server after adding env vars

### No results from search
- Check that content was ingested successfully
- Lower the threshold in the chat API (currently 0.3)
- Verify the pgvector extension is enabled

### Embedding errors
- Verify your OpenAI API key is valid
- Check your OpenAI account has credits

## Architecture

```
User Question
    ↓
Generate Embedding (OpenAI)
    ↓
Semantic Search (Supabase pgvector)
    ↓
Retrieve Top-K Chunks
    ↓
Format as Context
    ↓
Send to LLM (OpenAI GPT-4o-mini)
    ↓
Stream Response to User
```

## Next Steps

- Add more content files (projects, blog posts, etc.)
- Implement source citations in the chat UI
- Add re-ranking for better results
- Create an admin UI for content management
