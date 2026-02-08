---
name: create-ppt
description: Generate PowerPoint presentations from user input.
---

# Create-PPT Skill

This skill allows you to generate PowerPoint (`.pptx`) presentations based on user requirements.

## Capability
- Generate a structured PowerPoint presentation with multiple slides.
- Support for Title Slides and Content Slides (bullet points).
- Saves the file to a specified output path.

## Dependencies
This skill requires `python-pptx`.
Ensure it is installed in the environment where the script will run:
```bash
pip install python-pptx
```

## Usage Instructions

### 1. Gather Requirements
Ask the user for:
- **Presentation Title**
- **Target Audience** (optional, to tailor tone)
- **Key Topics/Slides** they want to include.
- **Output Filename** (default to `presentation.pptx`).

### 2. Structure the Content
Format the collected information into a JSON object with the following structure:

```json
{
  "output_file": "presentation.pptx",
  "presentation_title": "My Awesome Presentation",
  "slides": [
    {
      "layout": "Title Slide",
      "title": "Welcome",
      "subtitle": "Presented by AI"
    },
    {
      "layout": "Title and Content",
      "title": "Agenda",
      "content": [
        "Introduction",
        "Key Point 1",
        "Key Point 2",
        "Conclusion"
      ]
    }
  ]
}
```

**Layout Options:**
- `Title Slide`: Requires `title` and optional `subtitle`.
- `Title and Content`: Requires `title` and `content` (string or list of strings for bullets).
- `Section Header`: Requires `title`.

### 3. Generate Presentation
Run the generation script `scripts/generate_ppt.py` pass the JSON data.

You can pass the JSON data in two ways:
1.  **Directly as a string argument**:
    ```bash
    python3 .agent/skills/create-ppt/scripts/generate_ppt.py --json '{"output_file": "..." ...}'
    ```
2.  **Via a temporary file** (Recommended for large content):
    Write the JSON to a temp file (e.g., `data.json`) and run:
    ```bash
    python3 .agent/skills/create-ppt/scripts/generate_ppt.py --file data.json
    ```

### 4. Confirm Completion
The script will output `Presentation saved to: <filename>` on success.
Verify the file exists and notify the user.
