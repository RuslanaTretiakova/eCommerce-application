declare module 'toastify-js' {
  interface ToastifyOffset {
    x?: number | string;
    y?: number | string;
  }

  interface ToastifyOptions {
    text?: string;
    node?: Node;
    duration?: number;
    selector?: string | Node | ShadowRoot;
    destination?: string;
    newWindow?: boolean;
    close?: boolean;
    gravity?: 'top' | 'bottom';
    position?: 'left' | 'center' | 'right';
    backgroundColor?: string;
    avatar?: string;
    className?: string;
    stopOnFocus?: boolean;
    callback?: () => void;
    onClick?: () => void;
    offset?: ToastifyOffset;
    escapeMarkup?: boolean;
    style?: Partial<CSSStyleDeclaration>;
    ariaLive?: 'polite' | 'assertive' | 'off';
    oldestFirst?: boolean;
  }

  interface ToastifyObject {
    showToast(): void;
  }

  function Toastify(options: ToastifyOptions): ToastifyObject;

  export = Toastify;
}
