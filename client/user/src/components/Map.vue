<template>
    <l-map
        v-if="showMap"
        :zoom="zoom"
        :center="center"
        :options="mapOptions"
        @update:center="centerUpdate"
        @update:zoom="zoomUpdate"
        id="map"
        @click.self="resetMarkers"
        @ready="onReady"
    >
      <l-tile-layer :url="url" />
      <l-marker v-if="!isLoading" v-for="(h, index) in hospitals" :key="index" :lat-lng="getLatLng(h?.lat, h?.lng)" @click="toggleMarker">
        <l-icon>
          <img :src="defaultImg">
        </l-icon>
        <l-popup>
          <div class="popup col">
              <div class="popup__header row popup__item">
                  <div class="popup__pharmacy bg-def" />
                  <span
                      class="popup__title margin-lol"
                      :title="h.markerName"
                  >
                      {{ h.markerName }}
                  </span>
              </div>
              <div class="popup__body col popup__item">
                  <div class="row">
                      <div class="popup__marker bg-def" />
                      <span class="popup__marker-text margin-lol">{{ h.markerAddress }}</span>
                  </div>
                  <div class="info col">
                      <span class="info__header">Количество:</span>
                      <span class="info__body row">{{ h.amount }} {{ h.typeName }}</span>
                  </div>
              </div>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
</template>

<script>
    import { latLng } from 'leaflet';
    import { LMap, LIcon, LTileLayer, LMarker, LPopup, LTooltip } from '@vue-leaflet/vue-leaflet';
    import defaultImg from '@assets/imgs/icons/map/markers/default.svg'
    import activeImg from '@assets/imgs/icons/map/markers/active.svg'
    import { mapGetters } from 'vuex';

    export default {
        name: 'Map',
        title: 'Інформація про ліки',
        components: {
            LMap,
            LTileLayer,
            LMarker,
            LPopup,
            LTooltip,
            LIcon
        },
        data: () => ({
            zoom: 12,
            center: latLng(47.821281, 35.175476),
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            currentZoom: 11.5,
            currentCenter: latLng(47.821281, 35.175476),
            mapOptions: {
                zoomSnap: 0.5
            },
            showMap: true,
            defaultImg,
            activeImg,
            isLoading: true,
            isDefault: true,
            currentElement: null,
        }),
        computed: {
            ...mapGetters(['hospitals'])
        },
        async mounted() {
            this.isLoading = false;
        },
        methods: {
            zoomUpdate(zoom) {
                this.currentZoom = zoom;
            },

            onReady() {
                this.$emit('ready');
            },

            getLatLng(lat, lng) {
                if(lat && lng) {
                    return latLng(lat, lng);
                }

                return;
            },

            centerUpdate(center) {
                this.currentCenter = center;
            },

            toggleMarker(e) {
                this.isDefault = !this.isDefault;
                e.target._icon.children[0].setAttribute('src', (this.isDefault) ? defaultImg : activeImg);
            },

            resetMarkers(e) {
                if(!this.isDefault) {
                    e.target.querySelectorAll('.leaflet-marker-icon > img').forEach(image => image.setAttribute('src', defaultImg));
                    this.isDefault = true;
                }
            }
        }
    };
</script>

<style lang="scss">
    @import '../scss/libs/leaflet';

    #map {
        width: 100vw!important;
        height: 100vh!important;
    }

    .col {
        justify-content: center;
        align-items: baseline;
    }

    .popup {
        &__item {
            margin-bottom: 15px;
            align-items: baseline;
            width: 100%;
            justify-content: flex-start;
        }
        &__pharmacy{
            background-image: url('../assets/imgs/icons/map/popup/pharmacy.svg');
            background-size: 23px 26px ;
            width: 23px;
            height: 26px;
        }
        &__title {
            font-family: 'AvenirNextCyr Bold';
            width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 18px;
            color: $blue;
        }
        &__marker {
            background-image: url('../assets/imgs/icons/map/markers/default.svg');
            background-size: 16px 20px;
            width: 23px;
            height: 20px;
        }
        &__marker-text {
            color: $dark;
            font-size: 18px;
        }
    }

    .info {
        width: 100%;
        padding: 15px 0 0 10px;
        &__header{
            margin-bottom: 10px;
        }
        &__body{
            width: 100%;
            height: 53px;
            justify-content: flex-start;
            overflow-y: auto;
        }
    }

    .margin-lol {
        margin-left: 15px;
    }

</style>
