import { Component, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  @ViewChild(MatStepper) matStepper!: MatStepper;

  resumeForm!: FormGroup;
  experiences: FormControl[] = [];
  skills: FormControl[] = [];
  languages: FormControl[] = [];

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize the form and controls
    this.resumeForm = this.fb.group({
      fullName: new FormControl(''),
      phoneNumber: new FormControl(''),
      profileUrl: new FormControl(''),
      email: new FormControl(''),
      about: new FormControl(''),
      schoolName: new FormControl(''),
      startDate: new FormControl(''),
      endDate: new FormControl(''),
      studyField: new FormControl(''),
      degree: new FormControl(''),
      experienceTitle: new FormControl(''),
      companyName: new FormControl(''),
      expstartDate: new FormControl(''),
      expendDate: new FormControl(''),
      experienceField: new FormControl(''),
      //experiences: this.fb.array([]),
      skills: this.fb.array([]),
      languages: this.fb.array([])
    });

    // Add initial form controls for education, experience, and achievements
   // this.addEducation();
   // this.addExperience();
    this.addSkill();
    this.addLanguage();
  }


  submitForm(): void {
    if (this.resumeForm.valid) {
      const currentStep = this.matStepper.selectedIndex;
      if (currentStep < this.matStepper.steps.length - 1) {
        this.matStepper.next();
      } else {
        // If it's the last step, you can call the generateResumePDF function or any other finalization logic.
        this.generateResumePDF();
      }
    }
  }

  addSkill(): void {
    const control = this.fb.control('');
    this.skills.push(control);
  }

  areAllSkillsValid(): boolean {
    return this.experiences.every(skill => skill.valid);
  }

  addLanguage(): void {
    const control = this.fb.control('');
    this.languages.push(control);
  }

  areAllLanguagesValid(): boolean {
    return this.languages.every(language => language.valid);
  }


  wrapTextSimple(text: string, maxWidth: number) {
    if (text.length <= maxWidth) {
        return text;
    } else {
        let wrappedText = '';
        for (let i = 0; i < text.length; i += maxWidth) {
            wrappedText += text.substring(i, i + maxWidth) + '\n';
        }
        return wrappedText;
    }
}



  // Submit form
  generateResumePDF(): void {
    // Create a new instance of jsPDF
    const doc = new jsPDF();

    const imagePath = 'assets/img/templates/template(vert).png';

// Add the PNG image to the PDF document
    doc.addImage(imagePath, 'PNG', 0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height);


    const fullName = this.resumeForm.get('fullName')?.value ?? '';
    const phoneNumber = this.resumeForm.get('phoneNumber')?.value ?? '';
    const profileUrl = this.resumeForm.get('profileUrl')?.value ?? '';
    const email = this.resumeForm.get('email')?.value ?? '';
    const wrappedabout = this.wrapTextSimple(this.resumeForm.get('about')?.value ?? '', 65);

    // const schoolName = this.resumeForm.get('schoolName')?.value ?? '';    
    // const studyField = this.resumeForm.get('studyField')?.value ?? '';
    // const degree = this.resumeForm.get('degree')?.value ?? '';
    // const experienceTitle =this.resumeForm.get('experienceTitle')?.value ?? '';
    // const experienceField =this.resumeForm.get('experienceField')?.value ?? '';
    const startDate = this.resumeForm.get('startDate')?.value ?? '';
    const endDate = this.resumeForm.get('endDate')?.value ?? '';
    const edstartYear = startDate.substring(0, 4);
    const edendYear = endDate.substring(0, 4);

    const wrappedschoolName = this.wrapTextSimple(this.resumeForm.get('schoolName')?.value ?? '', 30);
    const wrappedstudyField = this.wrapTextSimple(this.resumeForm.get('studyField')?.value ?? '', 30);
    const wrappeddegree = this.wrapTextSimple(this.resumeForm.get('degree')?.value ?? '', 30);
    
    const expstartDate = this.resumeForm.get('expstartDate')?.value ?? '';
    const expendDate = this.resumeForm.get('expendDate')?.value ?? '';
    const exstartYear = expstartDate.substring(0, 4);
    const exendYear = expendDate.substring(0, 4);

    const wrappedexperienceTitle = this.wrapTextSimple(this.resumeForm.get('experienceTitle')?.value ?? '', 30);
    const wrappedcompanyName = this.wrapTextSimple(this.resumeForm.get('companyName')?.value ?? '', 30);

    const wrappedexperienceField = this.wrapTextSimple(this.resumeForm.get('experienceField')?.value ?? '', 30);
    // Add contact information
    doc.setFontSize(14); // Set font size to 14
    doc.setTextColor(255, 255, 255); // Set text color to white
    doc.text(`Name: ${fullName}`, 10, 15);
    doc.text(`Phone Number: ${phoneNumber}`, 10, 25);
    doc.text(`LinkedIn Profile: ${profileUrl}`, 10, 35);
    doc.text(`Email: ${email}`, 10, 45);
  
  
      let xPosition = 90;
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.text(`About Me:`, xPosition, 70);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`${wrappedabout}`, xPosition+5, 80);

      const lineHeight = 4; // Assuming each line of text occupies 10 units vertically

      // Calculate the height occupied by the wrapped text
      const wrappedaboutHeight = wrappedabout.split('\n').length * lineHeight;

      // Adjust educationPosition based on the wrappedabout height
      let educationPosition =  wrappedaboutHeight + 85; 
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14); // Set text color to black
      doc.text(`Education: `, xPosition, educationPosition );
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`School Name: ${wrappedschoolName} (${edstartYear}-${edendYear})`, xPosition+5, educationPosition+10);

      doc.text(`Study Field: ${wrappedstudyField}`, xPosition+5, educationPosition+20);
      doc.text(`Degree: ${wrappeddegree}`, xPosition+5, educationPosition+30);
    
      // Add other education fields as needed
      
    
      // Increment the vertical position for the next section
      let  experiencePosition = educationPosition+40; // Adjust as needed
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14); // Set text color to black
      doc.text(`Experience:`, xPosition, experiencePosition);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.text(`Experience Title: ${wrappedexperienceTitle} (${exstartYear}-${exendYear})`, xPosition+5, experiencePosition+10);
      doc.text(`Company Name: ${wrappedcompanyName}`, xPosition+5, experiencePosition+20);
      doc.text(`Experience Field: ${wrappedexperienceField}`, xPosition+5, experiencePosition+30);
      
    
      let skillPosition = 70;
      let SkillDisplayed = false;
    
      this.skills.forEach((skill, index) => {
        const skillTitle = skill.get('skillTitle')?.value ?? '';
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);

        if (!SkillDisplayed) {
          doc.text(`Skills:`, 10, skillPosition);
          SkillDisplayed = true;
        }
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text(`° ${skill.value}`, 15, skillPosition+10);
        
        skillPosition += 5; 
      });
    
      let languagePosition= skillPosition+20;
      let languageDisplayed = false;
      this.languages.forEach((language, index) => {
        const languageName = language.get('languageName')?.value ?? '';
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        if (!languageDisplayed) {
          doc.text(`Languages:`, 10, languagePosition);
          languageDisplayed = true;
        }
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text(`° ${language.value}`, 15, languagePosition + 10);
        
        languagePosition += 5; 
      });
  
  
    // Save the PDF
    doc.save((this.resumeForm.get('fullName')?.value ?? '') + 'Resume.pdf');
    console.log('Form Values:', this.resumeForm.value);


    //     const pdfUrl = 'C:/Users/MSI/Downloads/${fullName}Resume.pdf'; // URL or file path to your PDF

    // pdfjsLib.getDocument(pdfUrl).promise.then(function(pdf) {
    //     pdfPageToImage(pdf, 1, function(imageDataUrl) {
    //         console.log('Image data URL:', imageDataUrl);
    //         // Now you can use imageDataUrl as the source for an <img> element or for other purposes
    //     });
    // });
  }
  

  
 
  
  
  
  

 
}
