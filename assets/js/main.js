document.addEventListener('DOMContentLoaded', () => {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const hamburgerIcon = document.getElementById('hamburgerIcon');
  const closeIcon = document.getElementById('closeIcon');

  // Category dropdown elements (desktop)
  const categoryBtn = document.getElementById('categoryBtn');
  const categoryMenu = document.getElementById('categoryMenu');

  // Mobile category elements
  const mobileCategoryBtn = document.getElementById('mobileCategoryBtn');
  const mobileCategoryMenu = document.getElementById('mobileCategoryMenu');

  function openMobileMenu() {
    if (!mobileMenu) return;
      mobileBtn?.setAttribute('aria-expanded', 'true');
      // remove hidden to allow animation
      mobileMenu.classList.remove('hidden');
      // ensure start state
      mobileMenu.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
      mobileMenu.classList.add('opacity-0', 'translate-y-1', 'scale-95');
      // force reflow then add open classes
      // eslint-disable-next-line @mystudio/no-unused-expr
      mobileMenu.getBoundingClientRect();
      mobileMenu.classList.remove('opacity-0', 'translate-y-1', 'scale-95');
      mobileMenu.classList.add('opacity-100', 'translate-y-0', 'scale-100');
      hamburgerIcon?.classList.add('hidden');
      closeIcon?.classList.remove('hidden');
      // prevent background scrolling when menu open
      document.body.classList.add('overflow-hidden');
      // focus first focusable element inside menu for accessibility
      const firstFocusable = mobileMenu.querySelector('a, button, input');
      firstFocusable?.focus();
  }

  function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileBtn?.setAttribute('aria-expanded', 'false');
      // add closed classes
      mobileMenu.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
      mobileMenu.classList.add('opacity-0', 'translate-y-1', 'scale-95');
      // after animation, hide
      setTimeout(() => {
        if (mobileMenu) mobileMenu.classList.add('hidden');
      }, 220);
    hamburgerIcon?.classList.remove('hidden');
    closeIcon?.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    mobileBtn?.focus();
  }

  // Desktop category menu helpers
  function openCategoryMenu() {
    if (!categoryMenu || !categoryBtn) return;
    categoryBtn.setAttribute('aria-expanded', 'true');
    // match the HTML animation classes: remove hidden/closed classes and add open classes
    categoryMenu.classList.remove('opacity-0', 'translate-y-1', 'scale-95');
    categoryMenu.classList.add('opacity-100', 'translate-y-0', 'scale-100');
  }

  function closeCategoryMenu() {
    if (!categoryMenu || !categoryBtn) return;
    categoryBtn.setAttribute('aria-expanded', 'false');
    categoryMenu.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
    categoryMenu.classList.add('opacity-0', 'translate-y-1', 'scale-95');
  }

  function toggleCategoryMenu() {
    if (!categoryMenu || !categoryBtn) return;
    const expanded = categoryBtn.getAttribute('aria-expanded') === 'true';
    if (expanded) closeCategoryMenu(); else openCategoryMenu();
  }

  // Mobile category helpers (accordion)
  function toggleMobileCategory() {
    if (!mobileCategoryMenu || !mobileCategoryBtn) return;
    const expanded = mobileCategoryBtn.getAttribute('aria-expanded') === 'true';
    if (expanded) {
      mobileCategoryBtn.setAttribute('aria-expanded', 'false');
      mobileCategoryMenu.classList.add('hidden');
    } else {
      mobileCategoryBtn.setAttribute('aria-expanded', 'true');
      mobileCategoryMenu.classList.remove('hidden');
    }
  }

  mobileBtn?.addEventListener('click', () => {
    if (!mobileMenu) return;
    if (mobileMenu.classList.contains('hidden')) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeCategoryMenu();
      // close mobile accordion too
      if (mobileCategoryMenu && !mobileCategoryMenu.classList.contains('hidden')) {
        mobileCategoryMenu.classList.add('hidden');
        mobileCategoryBtn?.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Ensure menu closes when resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
      closeCategoryMenu();
    }
    // sticky header shadow toggle
    toggleHeaderShadow();
  });

  // Initialize: ensure mobile menu is hidden on load (use display none for animation)
  if (mobileMenu) {
     // start hidden with closed animation classes
     mobileMenu.classList.add('hidden', 'opacity-0', 'translate-y-1', 'scale-95');
  }

  // CATEGORY dropdown event wiring
  if (categoryBtn) {
    // click toggles for keyboard users
    categoryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleCategoryMenu();
    });

    // close when clicking outside
    document.addEventListener('click', (e) => {
      const target = e.target;
      if (!categoryMenu || !categoryBtn) return;
      if (!categoryMenu.contains(target) && !categoryBtn.contains(target)) {
        closeCategoryMenu();
      }
    });

    // keyboard support: open on ArrowDown or Enter/Space
    categoryBtn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openCategoryMenu();
      }
    });
  }

  // Mobile category accordion wiring
  if (mobileCategoryBtn) {
    mobileCategoryBtn.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMobileCategory();
    });
  }

  // --- Move selected header icons into mobile menu when width <= 843px ---
  const movableButtons = Array.from(document.querySelectorAll('[data-move-to-mobile="true"]'));
  // Store original parent and nextSibling for restoration. We'll move the smallest wrapper (closest .relative)
  const movableItems = movableButtons.map(btn => {
    const wrapper = btn.closest('.relative') || btn;
    return { node: wrapper, originalParent: wrapper.parentNode, nextSibling: wrapper.nextSibling, wrapperContainer: null };
  });

  const mobileMovedIcons = document.getElementById('mobileMovedIcons');

  function moveToMobile() {
    if (!mobileMovedIcons) return;
    movableItems.forEach(item => {
      if (!item.node) return;
      if (!item.wrapperContainer) {
        // create a mobile-friendly wrapper and move the node into it
        const row = document.createElement('div');
        row.className = 'mobile-moved-item relative w-full flex items-center justify-between p-2 rounded-md hover:bg-gray-50';
        // move the original node into the row
        row.appendChild(item.node);
        item.wrapperContainer = row;
      }

      if (!mobileMovedIcons.contains(item.wrapperContainer)) {
        mobileMovedIcons.appendChild(item.wrapperContainer);
      }
      // ensure the inner button stretches
      const innerBtn = item.node.querySelector('button');
      if (innerBtn) innerBtn.classList.add('w-full', 'flex', 'justify-between');
    });
  }

  function restoreToHeader() {
    movableItems.forEach(item => {
      if (!item.node) return;
      if (item.wrapperContainer && item.originalParent && !item.originalParent.contains(item.node)) {
        // move node back to original parent before removing wrapper
        if (item.nextSibling) item.originalParent.insertBefore(item.node, item.nextSibling);
        else item.originalParent.appendChild(item.node);
        // remove wrapper from DOM
        if (item.wrapperContainer.parentNode) item.wrapperContainer.parentNode.removeChild(item.wrapperContainer);
        // clean up classes added for mobile
        item.node.classList.remove('w-full', 'flex', 'justify-between');
        const innerBtn = item.node.querySelector('button');
        if (innerBtn) innerBtn.classList.remove('w-full', 'flex', 'justify-between');
        item.wrapperContainer = null;
      }
    });
  }

  function adjustIconsForWidth() {
    try {
      if (window.innerWidth <= 843) moveToMobile(); else restoreToHeader();
    } catch (e) {
      // swallow errors silently
      console.error('Icon move error', e);
    }
  }

  // run once on load and on resize
  adjustIconsForWidth();
  window.addEventListener('resize', adjustIconsForWidth);

  // sticky header shadow on scroll
  const siteHeader = document.getElementById('siteHeader');
  function toggleHeaderShadow() {
    if (!siteHeader) return;
    if (window.scrollY > 10) siteHeader.classList.add('shadow-md', 'backdrop-blur-sm');
    else siteHeader.classList.remove('shadow-md', 'backdrop-blur-sm');
  }
  window.addEventListener('scroll', toggleHeaderShadow);
  toggleHeaderShadow();
});