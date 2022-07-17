export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GTAG

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: any) => {
    window.gtag('config', GA_TRACKING_ID, {
        page_path: url,
    })
}

interface GTagEvent {
    action: any,
    category: any,
    label: any,
    value: any
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent) => {
    window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
    })
}
