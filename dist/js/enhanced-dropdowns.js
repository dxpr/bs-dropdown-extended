/**
 * Bootstrap 5 Enhanced Dropdowns
 * Adds support for split dropdown buttons and better keyboard navigation
 * Version 1.0.0
 */

class BootstrapEnhancedDropdowns {
  constructor(options = {}) {
    this.options = {
      splitButtonSelector: '.bs-dropdown-wrapper',
      caretSelector: '.bs-dropdown-caret',
      submenuSelector: '.bs-dropdown-submenu',
      fullToggleSelector: '.dropdown-toggle',
      debug: false,
      ...options
    };
        
    this.init();
  }
    
  init() {
    // Initialize after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupDropdowns());
    } else {
      this.setupDropdowns();
    }
  }
    
  setupDropdowns() {
    this.initSplitButtonDropdowns();
    this.initSubmenuDropdowns();
  }
    
  initSplitButtonDropdowns() {
    // Find all split button wrappers
    const splitButtons = document.querySelectorAll(this.options.splitButtonSelector);
        
    splitButtons.forEach((splitButton) => {
            
      const caretButton = splitButton.querySelector(this.options.caretSelector);
      const linkElement = splitButton.querySelector('.nav-link:not(' + this.options.fullToggleSelector + ')');
            
      if (!caretButton || !linkElement) {
        return;
      }
            
      // Get dropdown menu by id or find adjacent menu
      let menuId = caretButton.getAttribute('data-bs-target') || 
                          caretButton.getAttribute('aria-controls');
      let menu;
            
      if (menuId) {
        if (menuId.startsWith('#')) {
          menuId = menuId.substring(1);
        }
        menu = document.getElementById(menuId);
      }
            
      if (!menu) {
        // Try to find adjacent menu as sibling of wrapper
        menu = splitButton.nextElementSibling;
        if (menu && !menu.classList.contains('dropdown-menu')) {
          menu = null;
        }
      }
            
      if (!menu) {
        return;
      }
            
      // Initialize Bootstrap Dropdown
      let dropdownInstance = new bootstrap.Dropdown(caretButton);
            
      // Manually set the internal menu reference 
      // This is needed because the Bootstrap constructor may fail to find it
      // with our custom structure
      dropdownInstance._menu = menu;
            
      // Manual toggle handlers
      caretButton.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownInstance.toggle();
      });
            
      caretButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.stopPropagation();
          dropdownInstance.toggle();
        }
      });
            
      // Sync ARIA attributes on Bootstrap events
      caretButton.addEventListener('show.bs.dropdown', () => {
        caretButton.setAttribute('aria-expanded', 'true');
      });
            
      caretButton.addEventListener('hide.bs.dropdown', () => {
        caretButton.setAttribute('aria-expanded', 'false');
      });
            
      // Setup keyboard navigation within the menu
      this.setupMenuKeyboardNavigation(menu, caretButton, true);
    });
  }
    
  initSubmenuDropdowns() {
    // Find all submenu dropdowns
    const submenuDropdowns = document.querySelectorAll(this.options.submenuSelector);
        
    submenuDropdowns.forEach((submenu) => {
            
      const itemWrapper = submenu.querySelector('.bs-dropdown-item-wrapper');
      let toggleElement, linkElement, menu, isSplitButton = false;
            
      // Determine if this is a split button or full toggle
      if (itemWrapper) {
        // Split button
        linkElement = itemWrapper.querySelector('.dropdown-item:not(' + this.options.fullToggleSelector + ')');
        toggleElement = itemWrapper.querySelector(this.options.caretSelector);
        isSplitButton = true;
      } else {
        // Full toggle
        toggleElement = submenu.querySelector(this.options.fullToggleSelector);
      }
            
      if (!toggleElement) {
        return;
      }
            
      // Find the dropdown menu
      menu = submenu.querySelector('.dropdown-menu');
      if (!menu) {
        return;
      }
            
      // Ensure menu has ID and proper aria attributes
      let labelledById = '';
      if (isSplitButton && linkElement) {
        labelledById = linkElement.id || '';
      } else if (toggleElement) {
        labelledById = toggleElement.id || '';
      }
            
      if (!menu.id && labelledById) {
        menu.id = labelledById + '-menu';
      }
            
      if (labelledById) {
        menu.setAttribute('aria-labelledby', labelledById);
      }
            
      if (toggleElement) {
        if (menu.id && !toggleElement.hasAttribute('aria-controls')) {
          toggleElement.setAttribute('aria-controls', menu.id);
        }
      }
            
      // Initialize Bootstrap Dropdown
      let bsDropdownInstance = new bootstrap.Dropdown(toggleElement);
            
      // Manually set menu reference
      bsDropdownInstance._menu = menu;
            
      // Click handler for toggle
      toggleElement.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent parent dropdowns from closing
                
        // For splits, let link elements navigate
        if (toggleElement.tagName === 'A' && 
                    (toggleElement.getAttribute('href') === '#' || toggleElement.getAttribute('href') === '')) {
          event.preventDefault();
        }
                
        bsDropdownInstance.toggle();
      });
            
      // Keyboard handler
      toggleElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.stopPropagation();
          bsDropdownInstance.toggle();
        }
      });
            
      // ARIA sync
      toggleElement.addEventListener('show.bs.dropdown', () => {
        toggleElement.setAttribute('aria-expanded', 'true');
        submenu.classList.add('show'); // Add show class to submenu parent
      });
            
      toggleElement.addEventListener('shown.bs.dropdown', () => {
        const firstItem = menu.querySelector('.dropdown-item:not(.disabled)');
        if (firstItem) {
          firstItem.focus();
        }
      });
            
      toggleElement.addEventListener('hide.bs.dropdown', () => {
        toggleElement.setAttribute('aria-expanded', 'false');
        submenu.classList.remove('show'); // Remove show class from submenu parent
      });
            
      // Setup keyboard navigation
      this.setupMenuKeyboardNavigation(menu, toggleElement, isSplitButton);
    });
  }
    
  setupMenuKeyboardNavigation(menu, toggleElement, isSplitButton) {
    menu.addEventListener('keydown', (event) => {
      const items = Array.from(menu.querySelectorAll('.dropdown-item:not(.disabled)'));
      if (items.length === 0) return;
            
      const currentIndex = items.indexOf(document.activeElement);
      let handled = false;
            
      if (event.key === 'ArrowDown') {
        const nextIndex = currentIndex >= 0 ? (currentIndex + 1) % items.length : 0;
        items[nextIndex].focus();
        handled = true;
      } else if (event.key === 'ArrowUp') {
        const prevIndex = currentIndex >= 0 ? 
          (currentIndex - 1 + items.length) % items.length : items.length - 1;
        items[prevIndex].focus();
        handled = true;
      } else if (event.key === 'Escape' || 
                      (!isSplitButton && event.key === 'ArrowLeft') || 
                      (isSplitButton && event.key === 'ArrowLeft' && document.activeElement === items[0])) {
        // Close on Escape, or ArrowLeft with conditions
        if (toggleElement && 'hide' in toggleElement) {
          toggleElement.hide();
        } else if (toggleElement && toggleElement._element) {
          bootstrap.Dropdown.getInstance(toggleElement._element).hide();
        } else if (toggleElement) {
          bootstrap.Dropdown.getInstance(toggleElement).hide();
        }
        toggleElement.focus();
        handled = true;
      } else if (event.key === 'Tab') {
        // Let Tab navigate naturally but close if we're at boundaries
        if ((currentIndex === items.length - 1 && !event.shiftKey) || 
                    (currentIndex === 0 && event.shiftKey)) {
          // Let browser handle the Tab, but close the dropdown
          setTimeout(() => {
            if (toggleElement && 'hide' in toggleElement) {
              toggleElement.hide();
            } else if (toggleElement && toggleElement._element) {
              bootstrap.Dropdown.getInstance(toggleElement._element).hide();
            } else if (toggleElement) {
              bootstrap.Dropdown.getInstance(toggleElement).hide();
            }
          }, 0);
        }
      }
            
      if (handled) {
        event.preventDefault();
        event.stopPropagation();
      }
    });
  }
}

// Export for various module systems
if (typeof module !== 'undefined' && module.exports) {
  // CommonJS/Node
  module.exports = BootstrapEnhancedDropdowns;
} else if (typeof define === 'function' && define.amd) {
  // AMD/RequireJS
  define([], function() {
    return BootstrapEnhancedDropdowns;
  });
} else {
  // Browser global
  window.BootstrapEnhancedDropdowns = BootstrapEnhancedDropdowns;
} 