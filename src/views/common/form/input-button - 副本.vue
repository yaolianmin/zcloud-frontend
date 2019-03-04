<template>
	<table :value="localData" :dataEncry="dataEncry">
		<tr>
			<td style="width:500px">
                <Input :value="key_password" @on-change="get_input_val"></Input>
			</td>
			<td v-if="warning" style="top:0">
				<Alert type="warning" show-icon>Empty</Alert>
			</td>
			<td v-if="error">
				<Alert type="error" show-icon>Error</Alert>
			</td>
			<td>
				<Button @click="click">Generate Keys</Button>
			</td>
		</tr>
	</table>
</template>

<script>
	import generate_key from './generate-key.js';

    export default {
    	props: {
    		value: {
                type: Object,
                default: ''
            },
           	dataEncry: Number
    	},
        data () {
            return {
                localData: this.value,
                key_password: '',
                warning: false,
                error: false
            }
        },
        methods: {
        	init(val){
        		//console.log('###########init############',val);
        		this.key_password = val;
        	},
        	click(){
        		//console.log('###########click############',val);
        		//console.log('#####this.key_password########',this.key_password);
        		var a = this.dataEncry;
        		var b = this.key_password;
        		//generate_key.gen_11g_keys(a,b);
        		this.warning = true;
        		this.error = true;

        		//console.log('#####this.localData 111111########',this.localData['WepPassPhrase']);
            	//delete this.localData['WepPassPhrase'];
            	//this.$set(this.localData, 'WepPassPhrase', '123456');
            	//console.log('#####this.localData 222222########',this.localData['WepPassPhrase']);
        	},
        	get_input_val(event){
        		//console.log('###########get_input_val############',event.target.value);
        		this.key_password = event.target.value;
        	}
        	
        },
        created: function () {
            //console.log('#####this.localData########',this.localData['WepPassPhrase']);
            //this.localData['WepPassPhrase'] = "123456";

            //console.log('#####this.dataEncry########',this.dataEncry);
            //this.init(this.localData['WepPassPhrase']);
            this.init(this.localData);
        },
        watch: {
        	localData: function(val) {
                console.log('###########localData############',val);
                //console.log('###########value.WepPassPhrase############',val['WepPassPhrase']);
                //this.init(val['WepPassPhrase']);
            },
            key_password: function(val){
            	this.key_password = val;
            	this.localData = val;
            	console.log('###########key_password############',this.key_password );
            },
            dataEncry: function(val){
            	//console.log('###########dataEncry############',val);
            	this.dataEncry = val;
            }
        }
    }
</script>