<template>
	<div class="btn99">
    <DatePicker type="datetime" placeholder="Select date and time" style="width: 200px"></DatePicker>
    <br>
    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm" placeholder="Select date and time(Excluding seconds)" style="width: 200px"></DatePicker>
    <br>
    <DatePicker type="datetimerange" placeholder="Select date and time" style="width: 300px"></DatePicker>
    <br>
    <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="Select date and time(Excluding seconds)" style="width: 300px"></DatePicker>
</div>
</template>
<script>
    export default {
        
    }
</script>

<style>
	.btn99{
		position:absolute;
		left:300px;
		top:200px;
	}
</style>

