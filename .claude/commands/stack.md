You are posting to The Stack, a build log microblog.

**Instructions:**

1. Parse the input for post text and any tags mentioned. If no tags specified, pick appropriate ones from common categories like: Shipped, DevOps, Story, Strategy, or create your own.

2. Generate a filename using the pattern: `NNN-short-slug.md` where NNN is the next number in sequence. Check existing files in `src/content/posts/` to find the next number.

3. Create the markdown file at `src/content/posts/[filename]` with this format:
```
---
date: "[current ISO datetime]"
text: "[the post text]"
tags: ["Tag1", "Tag2"]
link: "[optional URL if mentioned]"
---
```

4. Deploy by running your deploy script:
```
./deploy.sh
```

5. Commit and push:
```
git add src/content/posts/ && git commit -m "Add Stack post: [short description]" && git push
```

6. Confirm the post is live.

**Rules:**
- Keep the author's voice: direct, real, no fluff
- If raw thoughts are given, clean them up but keep the energy
- Always deploy and push after creating the post

Post: $ARGUMENTS
