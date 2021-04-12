<template>
        <l-map
                :zoom="zoom"
                :center="center"
                style="height: 100vh; width: 100vw; top: 0; left: 0; position: absolute;"
                @click="getLatLng"
        >
            <l-tile-layer
                    :url="url"
            />
          <l-marker :lat-lng="marker" v-if="show">
            <l-icon>
              <img :src="defaultImg">
            </l-icon>
          </l-marker>
        </l-map>
        <button class="close"  @click="close">Назад</button>
</template>

<script>
    import { latLng } from "leaflet";
    import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
    import defaultImg from '../assets/imgs/icons/map/default.svg';

    export default {
        name: "Map",
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LIcon
        },
        data: () => ({
            zoom: 13,
            center: [47.821281, 35.175476],
            show: false,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            marker: latLng(0, 0),
            latLng: {},
            defaultImg
        }),
        methods: {
            getLatLng(e) {
                console.log('e', e);
                if(e?.latlng?.lng && e?.latlng?.lat) {
                    this.latLng = {lat: e.latlng.lat, lng: e.latlng.lng };
                    this.marker = [e.latlng.lat, e.latlng.lng];
                    this.show = true;
                    console.log('marker', this.marker);
                }
            },
            close() {
                this.$emit('close', this.latLng)
            }
        }
    };
</script>

<style lang="scss">
    .leaflet-control-attribution, .leaflet-control-container, .leaflet-control-container, .leaflet-shadow-pane {
        display: none!important;
    }

    .leaflet-marker-icon {
        height: 55px !important;
        width: 41px !important;
    }

    .close {
        font-family: 'AvenirNextCyr Bold';
        font-size: 19px;
        color: white;
        background-color: #2B48FF;
        z-index: 402;
        width: 100vw;
        height: 70px;
        position: absolute;
        top: 0;
        left: 0;
    }
</style>