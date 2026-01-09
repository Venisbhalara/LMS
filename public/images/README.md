# Images Directory

## Directory Structure

```
public/images/
├── courses/          # Course thumbnail images
├── companies/        # Company logo images
└── categories/       # Category placeholder images
```

## Adding Images

### Course Images
Place course images in `public/images/courses/` with these naming conventions:
- `react.png` - React courses
- `python.png` - Python/Data Science courses
- `design.png` - Design courses
- `business.png` - Business courses
- `flutter.png` - Mobile development courses
- etc.

### Company Logos
Place company logo images in `public/images/companies/` with these names:
- `google.png`
- `microsoft.png`
- `amazon.png`
- `apple.png`
- etc.

### Image Requirements
- **Format**: PNG or JPG
- **Recommended Size**: 
  - Course images: 800x600px or 16:10 aspect ratio
  - Company logos: 200x60px or similar
- **Optimization**: Compress images for web use
- **Naming**: Use lowercase with hyphens (e.g., `react-mastery.png`)

## Fallback
If images are not found, the system will use placeholder images from Unsplash.

