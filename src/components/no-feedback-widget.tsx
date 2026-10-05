"use client";

import { useEffect } from "react";
import { FEEDBACK_WIDGET } from "@/config/feedback";

const WIDGET_SCRIPT = `script[src="${FEEDBACK_WIDGET.src}"]`;

/**
 * Keeps the Loki widget off pages holding other people's data (/ops). A
 * client-side navigation (a Link, Back) keeps whatever scripts the last page
 * loaded, so if the widget is in this document, or arrives while the page is
 * open, a full load drops it: these pages never render it themselves.
 */
export function NoFeedbackWidget() {
  useEffect(() => {
    const reloadIfPresent = () => {
      if (document.querySelector(WIDGET_SCRIPT)) window.location.reload();
    };
    reloadIfPresent();
    const observer = new MutationObserver(reloadIfPresent);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);
  return null;
}
