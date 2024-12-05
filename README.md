# [Orion Star Cluster Hertzsprung-Russell Scatterplot](https://charityeverett.github.io/orion-constellation-scatterplot/)

This project visualizes the Orion Star Cluster using a 3D scatterplot based on stellar properties such as temperature, luminosity, and radius. The data is sourced from a GeoJSON file containing information about various stars in the cluster.

## Features

- **3D Visualization**: Stars are represented as spheres in a 3D space.
- **Axes Representation**: 
  - X-axis: Temperature (inverted)
  - Y-axis: Luminosity
  - Z-axis: Radius
- **Interactive Labels**: Hover over stars to see their names.

## Data Source

The star data is fetched from the following GeoJSON file:
- [Stars GeoJSON Data](https://dieghernan.github.io/celestial_data/data/stars.6.geojson)

### Data Properties Used:
- **Temperature**: Derived from B-V color index.
- **Luminosity**: Calculated from apparent magnitude.
- **Radius**: Estimated based on magnitude.

## Getting Started

### Prerequisites

Ensure you have a web browser that supports WebGL and A-Frame.

### Installation

1. Clone this repository or download the HTML file.
2. Open the HTML file in your web browser.

### Usage

Once the page loads, you will see a 3D representation of the Orion Star Cluster. You can navigate through the scene using your mouse or keyboard controls.

## License
MIT License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Special thanks to NASA for providing extensive datasets for astronomical research.
- Thanks to A-Frame for enabling easy creation of WebVR experiences.
