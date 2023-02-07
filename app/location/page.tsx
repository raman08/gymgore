"use client";

import {
	Combobox,
	ComboboxInput,
	ComboboxList,
	ComboboxOption,
	ComboboxPopover,
} from "@reach/combobox";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import axios from "axios";
// import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useGeolocated } from "react-geolocated";

import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";

export default function Location() {
	const [location, setLocation] = useState({ lat: 44, lng: -800 });

	// const router = useRouter();

	const { coords, isGeolocationEnabled } = useGeolocated({
		positionOptions: {
			enableHighAccuracy: true,
		},
		userDecisionTimeout: 5000,
	});

	const handleConfirmLocation = async () => {
		const data = await axios.post("/api/setLocation", {
			location: JSON.stringify(location),
		});

		console.log(data);

		// if (data.status === 200) {
		// router.push("/dashboard", {
		// 	forceOptimisticNavigation: true,
		// });
		window.location.href = "/dashboard";
		// }
	};

	useEffect(() => {
		setLocation({
			lat: coords?.latitude ?? 44,
			lng: coords?.longitude ?? -800,
		});
	}, [coords]);

	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
		libraries: ["places"],
	});

	if (!isGeolocationEnabled) {
		return <h1>Please enable geolocation</h1>;
	}

	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	return (
		<main className="w-full h-full flex flex-col">
			<Map location={location} />
			<button
				onClick={handleConfirmLocation}
				className="bg-yellow-600 p-2 rounded-md mt-4 self-center"
			>
				Confirm your location
			</button>
		</main>
	);
}

function Map({ location: loc }: { location: any }) {
	const center = useMemo(() => loc, [loc]);
	const [selected, setSelected] = useState();
	return (
		<div className="w-full h-[550px] flex flex-col gap-3">
			<div className="m-4">
				<PlacesAutoComplete setSelected={setSelected} />
			</div>
			<GoogleMap
				zoom={10}
				center={center}
				mapContainerClassName="w-full h-full"
			>
				{selected && <Marker position={selected} />}
			</GoogleMap>
		</div>
	);
}

function PlacesAutoComplete({ setSelected }: { setSelected: any }) {
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete();

	const handleSelect = async (address: any) => {
		setValue(address, false);
		clearSuggestions();

		const results = await getGeocode({ address });
		const { lat, lng } = getLatLng(results[0]);
		setSelected({ lat, lng });
	};

	return (
		<Combobox
			onSelect={handleSelect}
			className="flex rounded-md w-full  text-neutral-500"
		>
			<ComboboxInput
				className="w-full py-2 px-3 rounded-md"
				value={value}
				onChange={e => setValue(e.target.value)}
				disabled={!ready}
				placeholder="Search for the address"
			/>

			<ComboboxPopover>
				<ComboboxList>
					{status === "OK" &&
						data.map(({ place_id, description }) => (
							<ComboboxOption
								key={place_id}
								value={description}
							/>
						))}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	);
}
