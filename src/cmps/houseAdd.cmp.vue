<template>
         <el-form ref="form" :model="house" label-width="120px">
        <el-form-item label="House name">
          <el-input v-model="house.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input-number
            label="Price per night"
            v-model="house.price"
            :min="1"
            :max="10000"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="House type">
          <el-select
            v-model="house.type"
            placeholder="Please select house type"
          >
            <el-option label="Appartment" value="Appartment"></el-option>
            <el-option label="Villa" value="Villa"></el-option>
            <el-option label="House" value="House"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input-number
            label="House capacity"
            v-model="house.capacity"
            :min="1"
            :max="20"
          ></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-input-number
            label="Number of bedrooms"
            v-model="house.bedRooms"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="House tags">
          <el-checkbox-group v-model="house.tags">
            <el-checkbox label="Urbanic" name="tag"></el-checkbox>
            <el-checkbox label="Sea-view" name="tag"></el-checkbox>
            <el-checkbox label="Forest" name="tag"></el-checkbox>
            <el-checkbox label="Nature" name="tag"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Country">
          <el-select
            v-model="house.location.country"
            placeholder="Please insert a country"
          >
            <el-option label="Israel" value="Israel"></el-option>
            <el-option label="France" value="France"></el-option>
            <el-option label="Japan" value="Japan"></el-option>
            <el-option label="United States" value="United States"></el-option>
            <el-option
              label="United Kingdom"
              value="United Kingdom"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="City">
          <el-select
            v-model="house.location.city"
            placeholder="Please insert a city"
          >
            <el-option label="Tel Aviv" value="Tel Aviv"></el-option>
            <el-option label="Paris" value="Paris"></el-option>
            <el-option label="Tokyo" value="Tokyo"></el-option>
            <el-option label="New York" value="New York"></el-option>
            <el-option label="Los Angeles" value="Los Angeles"></el-option>
            <el-option label="London" value="London"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Activity form">
          <el-input type="textarea" v-model="house.description"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.prevent="onSubmit">Add</el-button>
        </el-form-item>
      </el-form>
</template>

<script>

export default {
    data() {
        return {
           house: {
          name: '',
          price: 0,
          type: '',
          capacity: 0,
          badRooms: 0,
          tags: [],
          amenities: ['Wifi', 'Self check-in', 'Kitchen', 'Air conditioning', 'Elevator', 'TV', 'Hair dryer', 'Hangers', 'Iron', 'Essentials'],
          location: {
            lat: 48.8665169951605,
            lng: 2.31821807029879,
            country: '',
            city: ''
          },
          description: '',
          reviews:[],
          chat: [],
          imgs: []
        }
        };
    },
    methods: {
            onSubmit() {
        console.log('submit!');
      }
    },
    computed: {

    },
};
</script>
