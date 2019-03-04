<template>
	<table :value="localData" :num="num">
		<tr>
			<td>
                <Checkbox :value="key_check" @on-change="change_box"> </Checkbox>
			</td>
			<td style="width:500px;">
				<Input :value="key_password"></Input>
			</td>
		</tr>
	</table>
</template>
<script>
    export default {
    	props: {
            value: {
                type: String,
                default: ''
            },
            //key_check: Boolean,
            //key_password: String,
            num: String
    	},
        data () {
            return {
                localData: this.value,
                key_check: false,
                key_password: ''
            }
        },
        methods: {
            init(val,num) {
                //console.log('######init val######',val);
                var key_data = val.split("-");
                //console.log('######key val######',key_data[0]);
                //console.log('######key choice######',key_data[1]);
                if(num == "key1" && key_data[4] == 1)
                    this.key_check = true;
                else if(num == "key2" && key_data[4] == 2)
                    this.key_check = true;
                else if(num == "key3" && key_data[4] == 3)
                    this.key_check = true;
                else if(num == "key4" && key_data[4] == 4)
                    this.key_check = true;

                if(num == "key1")
                    this.key_password = key_data[0];
                else if(num == "key2")
                    this.key_password = key_data[1];
                else if(num == "key3")
                    this.key_password = key_data[2];
                else if(num == "key4")
                    this.key_password = key_data[3];
            },
            change_box (val) {
                console.log('#####change_box this.localData########',val);
                console.log('#####change_box num ########',this.num);
                this.$emit('change-other-box',this.num,val);
            }
        },
        created: function () {
            //console.log('#####this.localData########',this.localData);
            //console.log('#####create num ########',this.num);
            this.init(this.localData,this.num);
        },
        watch: {
            key_check: function(val){
                console.log('###########key_check############',val);
            },
            value (val) {
                //console.log('###########value############',val);
                //console.log('#####watch num ########',this.num);
                this.init(val,this.num);
            }
        }
    }
</script>