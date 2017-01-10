import {Component, NgZone, Output, EventEmitter} from 'angular2/core'
import {FilterByPropertyPipe} from '../pipes/property.filter.pipe'

declare var CIQ: any;

@Component({
	selector: 'study-dialog',
	styleUrls:['app/css/CIQ_Seed.css', 'app/css/CIQ_Demo.css'],
	templateUrl: 'app/study_dialog_component/study.dialog.component.html',
	pipes:[FilterByPropertyPipe]
})

export class StudyDialog{
	zone:NgZone;
	studyHelper:any={};
	inputs:any=[];
	outputs:any;
	parameters:any;
	studyId:any;
	studyName:any;
	activeOutput:any={};
	@Output() launchDialog=new EventEmitter<any>();
	@Output() launchColorpickerEvent=new EventEmitter<any>();

	constructor(){
		this.zone = new NgZone({enableLongStackTrace: false});
	}

	addStudy(study,ciq){
		var self=this;
		function closure(fc){
			return function(){
				fc.apply(self, arguments);
			};
		}
		ciq.callbacks.studyOverlayEdit=closure(this.removeStudy);
		ciq.callbacks.studyPanelEdit=closure(this.showDialog);
		CIQ.Studies.addStudy(ciq, study);
	}
	showDialog=function(params){
		this.zone.run(()=>{
			this.studyHelper=new CIQ.Studies.DialogHelper({sd:params.sd,stx:params.stx});
			this.inputs=this.studyHelper.inputs;
			this.outputs=this.studyHelper.outputs;
			this.parameters=this.studyHelper.parameters;
			this.studyId=this.studyHelper.name;
			this.studyName=this.studyHelper.title;
			this.launchDialog.emit(true);
		});
	};

	updateStudyHelperColors(color, params){
		for (let x in this.studyHelper.outputs) {
			if (this.studyHelper.outputs.hasOwnProperty(x)) {
				if (this.studyHelper.outputs[x].name == params.name) {
					this.studyHelper.outputs[x].color = '#' + color;
				}
			}
		}
		for (let y in this.studyHelper.parameters) {
			if (this.studyHelper.parameters.hasOwnProperty(y)) {
				if (this.studyHelper.parameters[y].name == params.name) {
					this.studyHelper.parameters[y].color = '#' + color;
				}
			}
		}
	};

	launchColorpicker(setting, event){
		this.activeOutput['div']=event.target;
		this.launchColorpickerEvent.emit({
			swatch: event.target,
			setting:setting
		});
	}

	setColorFromPicker(params){
		this.updateStudyHelperColors(params.color, params.params);
		this.activeOutput.div.style.backgroundColor=CIQ.hexToRgba('#'+params.color);
	}

	removeStudy=function(args){
		CIQ.Studies.removeStudy(args.stx,args.sd);
	};

	closeMe=function(){
		this.launchDialog.emit(false);
	};

	updateStudy=function(inputs, outputs, params){
		var currentInputs={};
		var currentOutputs={};
		var currentParams={};
		for(var i=0; i<inputs.length; i++){
			currentInputs[inputs[i].name]=inputs[i].value;
		}
		for(var x=0; x<outputs.length; x++){
			currentOutputs[outputs[x].name]=outputs[x].color;
		}
		for(var y=0; y<params.length; y++){
			currentParams[params[y].name+'Value']=params[y].value;
			currentParams[params[y].name+'Color']=params[y].color;
		}

		this.studyHelper.updateStudy({inputs:currentInputs, outputs:currentOutputs, parameters:currentParams});
	};
}