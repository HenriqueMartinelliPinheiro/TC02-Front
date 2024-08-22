import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { z } from 'zod';
import { UseFormReturn } from 'react-hook-form';
import { eventFormSchema } from '@/@types/event/eventFormSchema';

interface EventMapProps {
	formMethods: UseFormReturn<z.infer<typeof eventFormSchema>>;
}

const EventMap: React.FC<EventMapProps> = ({ formMethods }) => {
	const mapRef = useRef<HTMLDivElement | null>(null);
	const mapInstanceRef = useRef<L.Map | null>(null);
	const markerRef = useRef<L.Marker | null>(null);
	const circleRef = useRef<L.Circle | null>(null);

	useEffect(() => {
		if (mapRef.current && !mapInstanceRef.current) {
			const initialCoordinates: [number, number] = [-23.5505, -46.6333]; // São Paulo, Brasil
			const map = L.map(mapRef.current).setView(initialCoordinates, 13);

			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: '&copy; OpenStreetMap contributors',
			}).addTo(map);

			mapInstanceRef.current = map;

			// Inicializa o círculo com um raio padrão
			const circle = L.circle(initialCoordinates, {
				color: 'red',
				fillColor: '#f03',
				fillOpacity: 0.5,
				radius: formMethods.getValues('eventRadius') || 1000, // Raio inicial em metros
			}).addTo(map);

			circleRef.current = circle;

			map.on('click', (e: L.LeafletMouseEvent) => {
				const { lat, lng } = e.latlng;

				if (markerRef.current) {
					markerRef.current.setLatLng([lat, lng]);
					circleRef.current?.setLatLng([lat, lng]);
				} else {
					markerRef.current = L.marker([lat, lng]).addTo(map);
					circleRef.current?.setLatLng([lat, lng]);
				}

				formMethods.setValue('eventLatitude', lat);
				formMethods.setValue('eventLongitude', lng);
			});

			circle.on('radiuschange', () => {
				const radius = circle.getRadius();
				formMethods.setValue('eventRadius', radius);
			});
		}
	}, [formMethods]);

	useEffect(() => {
		const radius = formMethods.watch('eventRadius');
		if (circleRef.current && radius) {
			circleRef.current.setRadius(radius);
		}
	}, [formMethods.watch('eventRadius')]);

	return <div ref={mapRef} style={{ height: '400px', width: '100%' }} />;
};

export default EventMap;
