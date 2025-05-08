# Bootstrap 5 Enhanced Dropdowns

A lightweight extension for Bootstrap 5 that adds support for split dropdown buttons, multilevel dropdown menus, and improved keyboard navigation.

## Features

- 🔗 Split dropdown buttons that separate navigation from dropdown toggling
- 🔄 Multilevel dropdown menus (nested submenus)
- ⌨️ Improved keyboard navigation and accessibility
- 📱 Mobile-friendly, responsive design
- 🎨 Bootstrap theming compatibility
- 📦 No dependencies other than Bootstrap 5

## Installation

```bash
npm install bootstrap5-enhanced-dropdowns
```

## Usage

### Include CSS and JS

#### Option 1: ESM/Module Import
```javascript
// Import the CSS
import 'bootstrap5-enhanced-dropdowns/dist/css/enhanced-dropdowns.css';

// Import and initialize the JS
import BootstrapEnhancedDropdowns from 'bootstrap5-enhanced-dropdowns';
new BootstrapEnhancedDropdowns();
```

#### Option 2: Script Tags
```html
<!-- Include Bootstrap 5 CSS and JS first -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- Then include Enhanced Dropdowns CSS and JS -->
<link href="path/to/enhanced-dropdowns.css" rel="stylesheet">
<script src="path/to/enhanced-dropdowns.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    new BootstrapEnhancedDropdowns();
  });
</script>
```

### HTML Structure

#### 1. Split Button (Top Level)

```html
<li class="nav-item dropdown">
  <!-- SPLIT BUTTON: Features -->
  <div class="bs-dropdown-wrapper">
    <a class="nav-link" href="#features" id="featuresDropdown">
      Features
    </a>
    <button class="bs-dropdown-caret" type="button" 
            aria-expanded="false" aria-controls="featuresMenu">
      <span class="visually-hidden">Toggle Features submenu</span>
    </button>
  </div>
  <ul class="dropdown-menu" id="featuresMenu" aria-labelledby="featuresDropdown">
    <li><a class="dropdown-item" href="#overview">Overview</a></li>
    <!-- Additional items... -->
  </ul>
</li>
```

#### 2. Split Button (Nested/Submenu)

```html
<li class="bs-dropdown-submenu">
  <div class="bs-dropdown-item-wrapper">
    <a class="dropdown-item" href="#performance" id="performanceDropdown">
      Performance
    </a>
    <button class="bs-dropdown-caret" type="button" aria-expanded="false" 
            aria-controls="performanceMenu">
      <span class="visually-hidden">Toggle Performance submenu</span>
    </button>
  </div>
  <ul class="dropdown-menu" id="performanceMenu" aria-labelledby="performanceDropdown">
    <li><a class="dropdown-item" href="#speed">Speed</a></li>
    <li><a class="dropdown-item" href="#reliability">Reliability</a></li>
  </ul>
</li>
```

#### 3. Full Toggle Link (Traditional Dropdown)

```html
<li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle" href="#" id="aboutDropdown" 
     data-bs-toggle="dropdown" aria-expanded="false">
    About
  </a>
  <ul class="dropdown-menu" aria-labelledby="aboutDropdown">
    <li><a class="dropdown-item" href="#about">About Overview</a></li>
    <!-- Additional items... -->
  </ul>
</li>
```

#### 4. Full Toggle Link (Nested/Submenu)

```html
<li class="bs-dropdown-submenu">
  <a class="dropdown-item dropdown-toggle" href="#" id="securityDropdown" 
     aria-expanded="false" aria-controls="securityMenu">
    Security
  </a>
  <ul class="dropdown-menu" id="securityMenu" aria-labelledby="securityDropdown">
    <li><a class="dropdown-item" href="#firewall">Firewall</a></li>
    <li><a class="dropdown-item" href="#encryption">Encryption</a></li>
  </ul>
</li>
```

### JavaScript Configuration

You can customize the dropdown initialization with options:

```javascript
new BootstrapEnhancedDropdowns({
  splitButtonSelector: '.bs-dropdown-wrapper',
  caretSelector: '.bs-dropdown-caret',
  submenuSelector: '.bs-dropdown-submenu',
  fullToggleSelector: '.dropdown-toggle',
  debug: false // Set to true for debugging output
});
```

## Accessibility Features

- Full keyboard navigation (arrows, enter, escape, tab)
- ARIA attributes automatically synchronized
- Focus management for keyboard users
- Visually hidden text for screen readers
- CSS-only focus states compatible with Bootstrap's design system

## Browser Support

This package supports all modern browsers supported by Bootstrap 5.

## License

MIT License 