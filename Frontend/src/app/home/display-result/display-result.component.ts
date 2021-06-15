import { Component, OnInit } from '@angular/core';
import { DataserviceService } from 'src/app/dataservice.service';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css']
})
export class DisplayResultComponent implements OnInit {
   
  option="default";
  reduceCancer={
    "01. Don't smoke.":" If you've never smoked, don't start. Talk to your children about not smoking so that they can understand how to avoid this major risk factor for lung cancer.",
    "02.Stop smoking.":"Stop smoking now. Quitting reduces your risk of lung cancer, even if you've smoked for years. Talk to your doctor about strategies and stop-smoking aids that can help you quit.",
    "03.Avoid secondhand smoke.":"If you live or work with a smoker, urge him or her to quit. At the very least, ask him or her to smoke outside. Avoid areas where people smoke. ",
    "04.Avoid carcinogens at work.":"Take precautions to protect yourself from exposure to toxic chemicals at work. Follow your employer's precautions. ",
    "05.Test your home for radon.":"Have the radon levels in your home checked, especially if you live in an area where radon is known to be a problem.",
    "06.Eat a diet full of fruits and vegetables.":"Choose a healthy diet with a variety of fruits and vegetables. Food sources of vitamins and nutrients are best.",
    "07. Exercise most days of the week.":"If you don't exercise regularly, start out slowly. Try to exercise most days of the week. "
  }
  treatment={
    " 01. Surgery.":"An operation where doctors cut out cancer tissue.",
    "02. Chemotherapy.":" Using special medicines to shrink or kill the cancer. The drugs can be pills you take or medicines given in your veins, or sometimes both.",
    "03. Radiation therapy.":"Using high-energy rays (similar to X-rays) to kill the cancer.",
    "04. Targeted therapy. ":"Using drugs to block the growth and spread of cancer cells. The drugs can be pills you take or medicines given in your veins."
  }
  cancerText="Lung cancer is treated in several ways, depending on the type of lung cancer and how far it has spread. People with non-small cell lung cancer can be treated with surgery, chemotherapy, radiation therapy, targeted therapy, or a combination of these treatments. People with small cell lung cancer are usually treated with radiation therapy and chemotherapy."
  previousResult=[{date:'02/06/2021',imgSrc:'uploaded_image_name.dicom',result:'Cancer not detected',accuracy:'83.57%'},
                    {date:'02/06/2021',imgSrc:'uploaded_image_name.dicom',result:'Cancer not detected',accuracy:'83.57%'}
                  ]
  
  
  constructor(private dataService:DataserviceService) 
  { 
    this.dataService.configObservable.subscribe((value:any) => {
      console.log("display component",value);
      this.option = value;
      if(this.option=='previous')
      {
        this.previousResult=this.dataService.putResults()
      }
    })
    this.dataService.resultObservable.subscribe((value:any)=>{
      console.log("result",value);
      this.previousResult=value;
    })
  }

  ngOnInit() {
    if(this.dataService.currentUser)
    {
      this.previousResult=this.dataService.currentUserResults
    }
  }
  deleteResult(i)
  {
    console.log(i,"index ");
    this.previousResult.splice(i,1);
    this.dataService.deleteResult(i);
  }
  
}
