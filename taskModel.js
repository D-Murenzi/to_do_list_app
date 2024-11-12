/*this module defines the task class and associated methods used to store tasks in indexedDB.*/

export class task {
    /*This class stands for task created in todo tasks.
     * it tries to store all task in form of objects
     * and all task descriptive properties as attributes.
     * enjoy reading it through.
     */
    static databaseName = 'taskDatabase';
    static databaseVersion = '1.0.0';
    static objectStore = 'tasks';
    static taskKey = 0;

    /*this is the constructor to initialize new instances of task class.*/
    constructor(taskName, taskDescription, taskDate, taskTime, taskPriority){
	task.taskKey++;
	this.taskName = taskName;
	this.taskDescription = taskDescription;
	this.taskDate = taskDate;
	this.taskTime = taskTime;
	this.taskPriority = taskPriority;
	this.key = task.taskKey;
    }
    //end of the constructor
    //--------------
    
    
    /*
     * This is save function, it is called on an instance and saves it into
     * the indexedDB of the user.
     */
    save(){
	const request = indexedDB.open(task.databaseName, task.databaseVersion);

	request.onupgradeneeded = (event) => {
	    const db = event.target.result;
	    
	    if (!db.objectStoreNames.contains(task.objectStore)){
		db.createObjectStore(task.objectStore, {keyPath:'key'});
	    }
	}

	request.onsuccess = (event) => {
	    const db = event.target.result;

	    const transaction = db.transaction([task.objectStore], 'readwrite');

	    const tasks = transaction.objectStore(task.objectStore);

	    const result = tasks.add(this);

	    result.onsuccess = () => {
		alert('Task saved successfully');
		console.log('task saved on this device.');
	    }

	    result.onerror = (e) => {
		console.log('failed to save due to this error:');
		console.log(e);
	    }
	}
    }
    //end of save function.
    //-------------------------

    
    /*This is load function
     * it is used to load object from indexedDB of user.
     * you can load all objects in the db by default by calling task.load();
     * or you can load single instance of your interest by passing the key of the instance
     * by task.load(instance.key);
     * it is static function that allows calling on class level without creating instances
     *this function return dictionary like objects that will need to be passed in new task constructor to form instances of the task.
     */
    static load(obj='all'){

	if (obj === 'all'){
	    const request = indexedDB.open(task.databaseName, task.databaseVersion);

	    request.onsuccess = (event) => {
		const db = event.target.result;

		if (db.objectstoreNames.contains(task.objectStore)){
		    const transaction = db.transaction([task.objectStore], 'readonly');

		    const store = transaction.objectStore(task.objectStore);
		    const allTasks = store.getall();
		    return allTasks;
		}
	    }
	    
	    request.onerror = () => {
		console.log('please wait while we load your task from server.');
	    }
		   
	    
	}
	else {
	    const request = indexededDB.open(task.databaseName, task.databaseVersion);
	    request.onsuccess = (event) => {
		const db = event.target.result;

		if(db.objectstoreNames.contains(task.objectStore)){
		    const transaction = db.transaction([task.objectStore], 'readonly');
		    const tasks = transaction.objectStore(task.objectStore);

		    const theTask = tasks.get(obj);

		    return  theTask;
		}
	    }

	    request.onerror = () => {
		console.log('please wait while we load your task from server.');
	    }
	}
    }
    /*end of load function.*/
    //--------------------------
    
    
    /* This function is used to update an instance of task class.
     *you need to make sure that you are calling this method on the instance of task class.
     * if the instance exist, it will overwrite it, if not it will create it by refering to Key.
     */
    
    update() {
	const request = indexedDB.open(task.databaseName, task.databaseVersion);

	request.onupgradeneeded = (event) => {
	    const db = event.target.result;
	    
	    if (!db.objectStoreNames.contains(task.objectStore)){
		db.createObjectStore(task.objectStore, {keyPath:'key'});
	    }
	}

	request.onsuccess = (event) => {
	    const db = event.target.result;

	    const transaction = db.transaction([task.objectStore], 'readwrite');

	    const tasks = transaction.objectStore(task.objectStore);

	    const result = tasks.put(this);

	    result.onsuccess = () => {
		alert('Task updated successfully');
		console.log('task updated and saved on this device.');
	    }

	    result.onerror = (e) => {
		console.log('failed to update due to this error:');
		console.log(e);
	    }
	}
    }
    //end of update function
    //----------------

    
    /*This function is used to delete an instance from indexedDB.
     * make sure to call it on the task instance you don't want
     * anymore as it will deleted them from the offline database.
     */
    delete() {
	const request = indexededDB.open(task.databaseName, task.databaseVersion);
	request.onsuccess = (event) => {
	    const db = event.target.result;

	    if(db.objectstoreNames.contains(task.objectStore)){
		const transaction = db.transaction([task.objectStore], 'readwrite');
		const tasks = transaction.objectStore(task.objectStore);

		const theTask = tasks.delete(this);
		console.log('Task  deleted from indexedDB');
		alert(`Task: {this.taskName} deleted successfully.`);
		}
	    }

	    request.onerror = () => {
		console.log('the task can\'t be deleted for now.');
	    }
    }
    //end of delete function.
    //-------------------

    
    //end of task class.
    //hope it was fun reading all the class through, my Respect. D-MURENZI.
}
