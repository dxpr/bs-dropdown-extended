# Migration Guide

This guide shows how to migrate from custom dropdown code to the Bootstrap 5 Enhanced Dropdowns package.

## HTML Changes

### Before (Custom HTML)

```html
<!-- Split Button Dropdown (Old Structure) -->
<li class="nav-item dropdown">
  <div class="nav-link-wrapper">
    <a class="nav-link" href="#features" id="featuresDropdown">
      Features
    </a>
    <button class="caret-toggler dropdown-toggle" type="button" id="featuresCaretToggler" 
            data-bs-target="#featuresMenu" aria-expanded="false" 
            aria-controls="featuresMenu" aria-labelledby="featuresDropdown">
      <span class="visually-hidden">Toggle Features submenu</span>
    </button>
  </div>
  <ul class="dropdown-menu" id="featuresMenu" aria-labelledby="featuresDropdown">
    <!-- Menu items -->
  </ul>
</li>

<!-- Nested Dropdown (Old Structure) -->
<li class="dropdown-submenu">
  <div class="dropdown-item-wrapper">
    <a class="dropdown-item" href="#features-performance" id="performanceDropdown">
      Performance
    </a>
    <button class="caret-toggler" type="button" aria-expanded="false" 
            aria-labelledby="performanceDropdown" aria-controls="performanceMenu">
      <span class="visually-hidden">Toggle Performance submenu</span>
    </button>
  </div>
  <ul class="dropdown-menu" id="performanceMenu" aria-labelledby="performanceDropdown">
    <!-- Menu items -->
  </ul>
</li>
```

### After (Using Enhanced Dropdowns Package)

```html
<!-- Split Button Dropdown (New Structure) -->
<li class="nav-item dropdown">
  <div class="bs-dropdown-wrapper">
    <a class="nav-link" href="#features" id="featuresDropdown">
      Features
    </a>
    <button class="bs-dropdown-caret" type="button" id="featuresCaretToggler" 
            aria-expanded="false" aria-controls="featuresMenu"
            aria-labelledby="featuresDropdown">
      <span class="visually-hidden">Toggle Features submenu</span>
    </button>
  </div>
  <ul class="dropdown-menu" id="featuresMenu" aria-labelledby="featuresDropdown">
    <!-- Menu items -->
  </ul>
</li>

<!-- Nested Dropdown (New Structure) -->
<li class="bs-dropdown-submenu">
  <div class="bs-dropdown-item-wrapper">
    <a class="dropdown-item" href="#features-performance" id="performanceDropdown">
      Performance
    </a>
    <button class="bs-dropdown-caret" type="button" aria-expanded="false" 
            aria-labelledby="performanceDropdown" aria-controls="performanceMenu">
      <span class="visually-hidden">Toggle Performance submenu</span>
    </button>
  </div>
  <ul class="dropdown-menu" id="performanceMenu" aria-labelledby="performanceDropdown">
    <!-- Menu items -->
  </ul>
</li>
```

## CSS Changes

1. Replace your custom CSS with the Enhanced Dropdowns package CSS:

```html
<!-- Remove your custom inline styles or CSS file -->
<!-- Add Enhanced Dropdowns CSS -->
<link href="path/to/enhanced-dropdowns.css" rel="stylesheet">
```

### Class Name Changes

| Old Class           | New Class                |
|---------------------|--------------------------|
| .nav-link-wrapper   | .bs-dropdown-wrapper     |
| .dropdown-item-wrapper | .bs-dropdown-item-wrapper |
| .caret-toggler      | .bs-dropdown-caret       |
| .dropdown-submenu   | .bs-dropdown-submenu     |

## JavaScript Changes

1. Replace your custom JavaScript initialization with the package:

```html
<!-- Remove your custom dropdown script -->
<!-- Add Enhanced Dropdowns JS -->
<script src="path/to/enhanced-dropdowns.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    new BootstrapEnhancedDropdowns();
  });
</script>
```

## Complete Example

See the `demo.html` file for a complete working example using the new package. 