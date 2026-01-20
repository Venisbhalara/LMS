import os

file_path = r"d:\L-M-S\src\components\Icons\Icons.jsx"
new_icon_code = """export const TrashIcon = ({ className = '', size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="trashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#b91c1c', stopOpacity: 1 }} />
      </linearGradient>
      <linearGradient id="trashLidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: '#ff6b6b', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#ef4444', stopOpacity: 1 }} />
      </linearGradient>
      <filter id="trashShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="rgba(185, 28, 28, 0.25)"/>
      </filter>
    </defs>
    <path d="M6 7L7.5 19.5C7.6 20.3 8.3 21 9.1 21H14.9C15.7 21 16.4 20.3 16.5 19.5L18 7H6Z" fill="url(#trashGrad)" filter="url(#trashShadow)"/>
    <rect x="4" y="4" width="16" height="3" rx="1.5" fill="url(#trashLidGrad)" filter="url(#trashShadow)"/>
    <path d="M9.5 4V2.5C9.5 1.7 10.2 1 11 1H13C13.8 1 14.5 1.7 14.5 2.5V4H9.5Z" fill="url(#trashLidGrad)"/>
    <path d="M9.5 10V18" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M14.5 10V18" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)"""

try:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    start_marker = 'export const TrashIcon = ({ className = "", size = 20 }) => ('
    # The file has double quotes for props in the existing version, per Step 368
    
    # Try finding the start index
    start_index = content.find(start_marker)
    if start_index == -1:
        # Try single quotes just in case
        start_marker = "export const TrashIcon = ({ className = '', size = 20 }) => ("
        start_index = content.find(start_marker)

    if start_index == -1:
        print("Error: Could not find TrashIcon start")
        exit(1)

    # Find the end of this component. It ends before 'export const MailIcon'
    next_component_marker = "export const MailIcon"
    end_index = content.find(next_component_marker, start_index)
    
    if end_index == -1:
        print("Error: Could not find next component marker")
        exit(1)

    # The end_index is at 'export const MailIcon'. We want to replace everything up to that, 
    # but we need to check if there is a newline or something.
    # The previous component ends with );\n\n usually.
    # Let's verify what we are replacing.
    
    # We will replace from start_index up to the last closing parenthesis and semicolon before end_index.
    # Actually, simpler: just find the last `);` before `export const MailIcon`.
    
    # Search backwards from end_index for `);`
    # But wait, looking at File content, it ends with `);\n\n`
    
    # Let's slice and replace.
    # Find the last `);` before `export const MailIcon`
    # We can just replace from start_index to end_index, ensuring we strip whitespace to match boundaries nicely.
    
    # Check what is between the end of TrashIcon and MailIcon.
    # Usually `\n\n`.
    
    # Let's blindly replace from start_index to end_index, but append a newline if needed.
    
    pre_content = content[:start_index]
    post_content = content[end_index:]
    
    # We need to make sure we don't eat the newlines acting as separator if they are part of "post_content".
    # start_index is at "export const TrashIcon..."
    # end_index is at "export const MailIcon..."
    
    # So we simply replace the chunk.
    # But we want to ensure we leave clean spacing.
    
    # Let's see if we can find the exact end.
    # The snippet in Step 368 ends with `);` at line 970.
    #Line 971 is `export const MailIcon`
    
    updated_content = pre_content + new_icon_code + "\n\n" + post_content
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(updated_content)
        
    print("Successfully updated TrashIcon")

except Exception as e:
    print(f"Error: {e}")
