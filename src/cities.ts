/**
 * Service-area map config. Add a city here and it gets a pin automatically.
 * label: which side of the pin the label sits on.
 */
export type City = {name: string; lat: number; lon: number; label: 'l' | 'r' | 't' | 'b'; home?: boolean; /** optional label nudge in px */ dx?: number; dy?: number};

export const CITIES: City[] = [
  {name: 'Aurora', lat: 39.7294, lon: -104.8319, label: 'r', home: true},
  {name: 'Denver', lat: 39.7392, lon: -104.9903, label: 'b', dx: 6},
  {name: 'Lakewood', lat: 39.7047, lon: -105.0814, label: 'l'},
  {name: 'Arvada', lat: 39.8028, lon: -105.0875, label: 'l'},
  {name: 'Westminster', lat: 39.8367, lon: -105.0372, label: 't', dx: -40},
  {name: 'Thornton', lat: 39.868, lon: -104.9719, label: 'r'},
  {name: 'Centennial', lat: 39.5807, lon: -104.8772, label: 'r'},
  {name: 'Littleton', lat: 39.6133, lon: -105.0166, label: 'l'},
  {name: 'Castle Rock', lat: 39.3722, lon: -104.8561, label: 'r'},
  {name: 'Colorado Springs', lat: 38.8339, lon: -104.8214, label: 'r'},
];

type LL = [number, number]; // [lat, lon]

export const HIGHWAYS: {name: string; pts: LL[]; major?: boolean}[] = [
  {name: 'I-25', major: true, pts: [[40.4, -104.98], [39.87, -104.99], [39.74, -104.995], [39.66, -104.94], [39.6, -104.89], [39.55, -104.87], [39.37, -104.86], [39.1, -104.86], [38.95, -104.83], [38.83, -104.84], [38.5, -104.73]]},
  {name: 'I-70', major: true, pts: [[39.63, -106.6], [39.7, -106.1], [39.68, -105.7], [39.74, -105.4], [39.72, -105.2], [39.78, -105.05], [39.785, -104.95], [39.77, -104.85], [39.74, -104.6], [39.7, -104.1]]},
  {name: 'I-225', pts: [[39.63, -104.91], [39.67, -104.84], [39.72, -104.82], [39.77, -104.8]]},
  {name: 'E-470', pts: [[39.55, -104.87], [39.57, -104.76], [39.65, -104.72], [39.75, -104.73], [39.85, -104.76], [39.95, -104.88], [39.94, -105.02]]},
  {name: 'C-470', pts: [[39.55, -104.87], [39.56, -104.99], [39.58, -105.08], [39.63, -105.15], [39.71, -105.18], [39.78, -105.21]]},
  {name: 'US-285', pts: [[39.65, -105.0], [39.63, -105.15], [39.55, -105.35], [39.45, -105.6], [39.35, -105.9], [39.2, -106.2]]},
  {name: 'US-24', pts: [[38.84, -104.86], [38.86, -104.95], [38.93, -105.1], [38.99, -105.3], [39.0, -105.6], [39.05, -106.0]]},
  {name: 'US-36', pts: [[39.83, -105.0], [39.9, -105.08], [39.97, -105.2], [40.02, -105.27]]},
  {name: 'CO-83', pts: [[39.7, -104.82], [39.55, -104.8], [39.35, -104.75], [39.1, -104.75], [38.92, -104.78]]},
];

/** Coverage zone: metro → Colorado Springs, extending west into the mountains. */
export const COVERAGE: LL[] = [
  [40.0, -105.12], [39.98, -104.85], [39.88, -104.66], [39.68, -104.6], [39.45, -104.66], [39.15, -104.66],
  [38.92, -104.64], [38.72, -104.74], [38.72, -104.95], [38.86, -105.12], [39.05, -105.42], [39.32, -105.7],
  [39.62, -105.86], [39.86, -105.74], [40.0, -105.45],
];
