import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {
  public error;
  public successMsg;
  public loading = false;
  public uploadForm: FormGroup = new FormGroup({
    description: new FormControl( '', [ Validators.required ] ),
    imageUpload: new FormControl( null, [Validators.required] ),
    image: new FormControl( null, [Validators.required] ),
  });

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if ( file.size > 500000 ) {
        alert( "File can't be larger than 500 KB" );
        this.uploadForm.get('imageUpload').reset();
      } else {
        this.uploadForm.patchValue({
          image: file
        });
      }
    }
  }

  upload() {
    const { description, image } = this.uploadForm.value;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('description', description);

    this.loading = true;
    this.error = undefined;
    this.successMsg = undefined;
    this.httpClient.post( '/api/image/upload', formData )
      .pipe( finalize( () => {
        this.loading = false;
      } ) )
      .subscribe( res => {
        this.error = undefined;
        this.successMsg = 'Image uploaded';
      }, ( { error } ) => {
        this.error = error.err
        this.successMsg = undefined;
      } )
  }

}
