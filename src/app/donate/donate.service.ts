import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

/**
 * A wraper class for AngularFirestore module
 * Docs can be found at https://github.com/angular/angularfire/tree/master/docs
 */

@Injectable({
  providedIn: "root",
})
export class DonateService {
  constructor(private afs: AngularFirestore) {}

  getCollectionRef(collectionName, options): AngularFirestoreCollection {
    return this.afs.collection<any>(collectionName, options);
  }

  getCollection(collectionName): Observable<any[]> {
    return this.afs.collection<any>(collectionName).valueChanges();
  }

  addDocument(collectionName, data): Promise<DocumentReference> {
    return this.afs.collection<any>(collectionName).add(data);
  }

  getDocument(collectionName, documentId): Observable<any[]> {
    return this.afs.doc<any>(`${collectionName}/${documentId}`).valueChanges();
  }
  getDocumentRef(collectionName, documentId): AngularFirestoreDocument {
    return this.afs.doc<any>(`${collectionName}/${documentId}`);
  }
  setDocument(collectionName, documentId, data): Promise<void> {
    return this.afs
      .doc<any>(`${collectionName}/${documentId}`)
      .set(data, { merge: true });
  }
  updateDocument(collectionName, documentId, data): Promise<void> {
    return this.afs.doc<any>(`${collectionName}/${documentId}`).update(data);
  }
  removeDocument(collectionName, documentId): Promise<void> {
    return this.afs.doc<any>(`${collectionName}/${documentId}`).delete();
  }

  generateUID() {
    return this.afs.createId();
  }
}
