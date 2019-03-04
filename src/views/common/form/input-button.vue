<template>
	<table :value="localData" :dataEncry="dataEncry">
		<tr>
			<td style="width:500px">
                <Input :value="key_password" @on-change="get_input_val" :disabled="wepStatus"></Input>
			</td>
			<td v-show="warning">
				<Alert type="warning" show-icon>Must not be Null</Alert>
			</td>
			<td v-show="error">
				<Alert type="error" show-icon>Error</Alert>
			</td>
			<td>
				<Button @click="click" :disabled="wepStatus">Generate Keys</Button>
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
                wepStatus: false,
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
        		var a = this.dataEncry;
        		var b = this.key_password;
        		//console.log('########### this.dataEncry ############',a);
        		//console.log('########### this.key_password ############',b);
        		if(0 == b.length || b.length > 64){
        			this.warning = true;
        			this.error = false;
        			return false;
        		}

        		var callbackVal = generate_key.gen_11g_keys(this,a,b);
        		if(callbackVal == 'error'){
        			this.warning = false;
        			this.error = true;
        		}
        		else{
        			this.warning = false;
        			this.error = false;
        		}
        		//console.log('########### this.callbackVal ############',callbackVal);
        		//console.log('########### this.callbackVal ############',callbackVal['key1']);

            	delete this.localData['key1'];
            	delete this.localData['key2'];
            	delete this.localData['key3'];
            	delete this.localData['key4'];
            	delete this.localData['choice'];

            	this.$set(this.localData, 'key1', callbackVal['key1']);
                this.$set(this.localData, 'key2', callbackVal['key2']);
                this.$set(this.localData, 'key3', callbackVal['key3']);
                this.$set(this.localData, 'key4', callbackVal['key4']);
                this.$set(this.localData, 'choice', 'key1');
        	},
        	get_input_val(event){
        		//console.log('###########get_input_val############',event.target.value);
        		this.key_password = event.target.value;
        		delete this.localData['WepPassPhrase'];
        		this.$set(this.localData, 'WepPassPhrase', this.key_password);
        	}
        	
        },
        created: function () {
            if(this.dataEncry == 0 || this.dataEncry == 253 || this.dataEncry == 254 || this.dataEncry == 255)
            	this.wepStatus = true;
            else 
            	this.wepStatus = false;

            this.init(this.localData['WepPassPhrase']);
        },
        watch: {
            dataEncry: function(val){
            	//console.log('########### watch dataEncry############',val);
            	this.dataEncry = val;
            	//console.log('########### watch dataEncry############',this.dataEncry);
            	if(this.dataEncry == 0 || this.dataEncry == 253 || this.dataEncry == 254 || this.dataEncry == 255)
            		this.wepStatus = true;
            	else 
            		this.wepStatus = false;
            }
        }
    }
</script>