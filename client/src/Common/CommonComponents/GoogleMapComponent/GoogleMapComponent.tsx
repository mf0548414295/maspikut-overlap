import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import {
  mapContainerClose,
  mapContainerOpen,
} from './GoogleMapComponent.StyleSheet';

const GoogleMapComponent: React.FC<{
  coordinates: [number, number];
  modalOpen: boolean;
}> = ({ coordinates, modalOpen }) => {
  const [lat, lng] = coordinates;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
  });

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={modalOpen ? mapContainerOpen : mapContainerClose}
      center={{ lat, lng }}
      zoom={10}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
};

export default GoogleMapComponent;
