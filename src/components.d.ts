/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface XbelakeAmbulanceWlApp {
        "ambulanceId": string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "ambulance-id"?: string;
        "apiBase": string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "api-base"?: string;
        "basePath": string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "base-path"?: string;
    }
    interface XbelakeAmbulanceWlEditor {
        "ambulanceId": string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "ambulance-id"?: string;
        "apiBase": string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "api-base"?: string;
        "entryId": string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "entry-id"?: string;
    }
    interface XbelakeAmbulanceWlList {
        "ambulanceId": string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "ambulance-id"?: string;
        "apiBase": string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "api-base"?: string;
    }
}
export interface XbelakeAmbulanceWlEditorCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXbelakeAmbulanceWlEditorElement;
}
export interface XbelakeAmbulanceWlListCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLXbelakeAmbulanceWlListElement;
}
declare global {
    interface HTMLXbelakeAmbulanceWlAppElement extends Components.XbelakeAmbulanceWlApp, HTMLStencilElement {
    }
    var HTMLXbelakeAmbulanceWlAppElement: {
        prototype: HTMLXbelakeAmbulanceWlAppElement;
        new (): HTMLXbelakeAmbulanceWlAppElement;
    };
    interface HTMLXbelakeAmbulanceWlEditorElementEventMap {
        "editor-closed": string;
    }
    interface HTMLXbelakeAmbulanceWlEditorElement extends Components.XbelakeAmbulanceWlEditor, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXbelakeAmbulanceWlEditorElementEventMap>(type: K, listener: (this: HTMLXbelakeAmbulanceWlEditorElement, ev: XbelakeAmbulanceWlEditorCustomEvent<HTMLXbelakeAmbulanceWlEditorElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXbelakeAmbulanceWlEditorElementEventMap>(type: K, listener: (this: HTMLXbelakeAmbulanceWlEditorElement, ev: XbelakeAmbulanceWlEditorCustomEvent<HTMLXbelakeAmbulanceWlEditorElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXbelakeAmbulanceWlEditorElement: {
        prototype: HTMLXbelakeAmbulanceWlEditorElement;
        new (): HTMLXbelakeAmbulanceWlEditorElement;
    };
    interface HTMLXbelakeAmbulanceWlListElementEventMap {
        "entry-clicked": string;
    }
    interface HTMLXbelakeAmbulanceWlListElement extends Components.XbelakeAmbulanceWlList, HTMLStencilElement {
        addEventListener<K extends keyof HTMLXbelakeAmbulanceWlListElementEventMap>(type: K, listener: (this: HTMLXbelakeAmbulanceWlListElement, ev: XbelakeAmbulanceWlListCustomEvent<HTMLXbelakeAmbulanceWlListElementEventMap[K]>) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof HTMLXbelakeAmbulanceWlListElementEventMap>(type: K, listener: (this: HTMLXbelakeAmbulanceWlListElement, ev: XbelakeAmbulanceWlListCustomEvent<HTMLXbelakeAmbulanceWlListElementEventMap[K]>) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof DocumentEventMap>(type: K, listener: (this: Document, ev: DocumentEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener<K extends keyof HTMLElementEventMap>(type: K, listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var HTMLXbelakeAmbulanceWlListElement: {
        prototype: HTMLXbelakeAmbulanceWlListElement;
        new (): HTMLXbelakeAmbulanceWlListElement;
    };
    interface HTMLElementTagNameMap {
        "xbelake-ambulance-wl-app": HTMLXbelakeAmbulanceWlAppElement;
        "xbelake-ambulance-wl-editor": HTMLXbelakeAmbulanceWlEditorElement;
        "xbelake-ambulance-wl-list": HTMLXbelakeAmbulanceWlListElement;
    }
}
declare namespace LocalJSX {
    interface XbelakeAmbulanceWlApp {
        "ambulanceId"?: string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "ambulance-id"?: string;
        "apiBase"?: string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "api-base"?: string;
        "basePath"?: string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "base-path"?: string;
    }
    interface XbelakeAmbulanceWlEditor {
        "ambulanceId"?: string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "ambulance-id"?: string;
        "apiBase"?: string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "api-base"?: string;
        "entryId"?: string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "entry-id"?: string;
        "onEditor-closed"?: (event: XbelakeAmbulanceWlEditorCustomEvent<string>) => void;
    }
    interface XbelakeAmbulanceWlList {
        "ambulanceId"?: string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "ambulance-id"?: string;
        "apiBase"?: string;
        /**
         * @deprecated use camelCase instead. Support for dash-casing will be removed in Stencil v5.
         */
        "api-base"?: string;
        "onEntry-clicked"?: (event: XbelakeAmbulanceWlListCustomEvent<string>) => void;
    }
    interface IntrinsicElements {
        "xbelake-ambulance-wl-app": XbelakeAmbulanceWlApp;
        "xbelake-ambulance-wl-editor": XbelakeAmbulanceWlEditor;
        "xbelake-ambulance-wl-list": XbelakeAmbulanceWlList;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "xbelake-ambulance-wl-app": LocalJSX.XbelakeAmbulanceWlApp & JSXBase.HTMLAttributes<HTMLXbelakeAmbulanceWlAppElement>;
            "xbelake-ambulance-wl-editor": LocalJSX.XbelakeAmbulanceWlEditor & JSXBase.HTMLAttributes<HTMLXbelakeAmbulanceWlEditorElement>;
            "xbelake-ambulance-wl-list": LocalJSX.XbelakeAmbulanceWlList & JSXBase.HTMLAttributes<HTMLXbelakeAmbulanceWlListElement>;
        }
    }
}
