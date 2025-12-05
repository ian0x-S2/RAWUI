import { getContext, setContext } from 'svelte';
import { browser } from '$app/environment';

export type SidebarVariant = 'default' | 'collapsible' | 'floating';
export type SidebarSide = 'left' | 'right';

type SidebarOptions = {
 defaultOpen?: boolean;
 variant?: SidebarVariant;
 side?: SidebarSide;
};

const SIDEBAR_COOKIE_NAME = 'sidebar:state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const MOBILE_BREAKPOINT = 768;

export class SidebarState {
 open = $state(true);
 mobileOpen = $state(false);
 isMobile = $state(false);

 variant: SidebarVariant;
 side: SidebarSide;

 private mediaQuery: MediaQueryList | null = null;
 private mediaQueryHandler: ((e: MediaQueryListEvent) => void) | null = null;

 constructor(options: SidebarOptions = {}) {
  this.variant = options.variant ?? 'default';
  this.side = options.side ?? 'left';

  this.open = this.variant === 'floating' ? false : (options.defaultOpen ?? true);

  if (browser) {
   this.setupMediaQuery();
  }

  $effect(() => {
   if (browser) {
    if (this.isMobile && this.mobileOpen) {
     document.body.style.overflow = 'hidden';
    } else {
     document.body.style.overflow = '';
    }
   }
  });
 }

 private setupMediaQuery() {
  this.mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
  this.isMobile = this.mediaQuery.matches;

  this.mediaQueryHandler = (e: MediaQueryListEvent) => {
   this.isMobile = e.matches;
   if (!e.matches) {
    this.mobileOpen = false;
   }
  };

  this.mediaQuery.addEventListener('change', this.mediaQueryHandler);
 }

 destroy() {
  if (this.mediaQuery && this.mediaQueryHandler) {
   this.mediaQuery.removeEventListener('change', this.mediaQueryHandler);
  }
 }

 private setCookie(value: boolean) {
  if (browser && this.variant !== 'floating') {
   document.cookie = `${SIDEBAR_COOKIE_NAME}=${value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; SameSite=Lax`;
  }
 }

 get isOpen() {
  return this.isMobile ? this.mobileOpen : this.open;
 }

 set isOpen(value: boolean) {
  if (this.isMobile) {
   this.mobileOpen = value;
  } else {
   this.open = value;
   this.setCookie(value);
  }
 }

 get isCollapsed() {
  return this.variant === 'collapsible' && !this.open && !this.isMobile;
 }

 get isFloating() {
  return this.variant === 'floating';
 }

 toggle = () => {
  this.isOpen = !this.isOpen;
 };

 openSidebar = () => {
  this.isOpen = true;
 };

 close = () => {
  this.isOpen = false;
 };

 get sidebarWidth() {
  if (this.isFloating && !this.isMobile) {
   return this.isOpen ? 'var(--sidebar-width)' : '0px';
  }
  if (this.isOpen) {
   return 'var(--sidebar-width)';
  }
  return this.variant === 'collapsible' ? 'var(--sidebar-width-icon)' : '0px';
 }

 get spacerWidth() {
  if (this.isFloating) {
   return '0px';
  }
  return this.sidebarWidth;
 }

 get triggerProps() {
  return {
   type: 'button' as const,
   'aria-label': this.isOpen ? 'Close sidebar' : 'Open sidebar',
   'aria-expanded': this.isOpen,
   'data-state': this.isOpen ? 'open' : 'closed',
   'data-sidebar': 'trigger',
   onclick: this.toggle
  };
 }

 get overlayProps() {
  return {
   'aria-label': 'Close sidebar',
   'data-sidebar': 'overlay',
   onclick: this.close
  };
 }

 get sidebarProps() {
  return {
   'data-state': this.isOpen ? 'open' : 'closed',
   'data-variant': this.variant,
   'data-side': this.side,
   'data-sidebar': 'sidebar'
  };
 }
}

const SIDEBAR_CTX_KEY = 'sidebar-root';

export function setSidebarContext(state: SidebarState) {
 return setContext(SIDEBAR_CTX_KEY, state);
}

export function getSidebarContext() {
 return getContext<SidebarState>(SIDEBAR_CTX_KEY);
}
