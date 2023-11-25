class validator{
    static tasksIdExist(taskPassed, taskExist){
        let idMatched= taskExist.some( val => val.id ==taskPassed.id);
        // let idMatched= taskExist.some
        if(idMatched) return false;
        return true;
    }
    static titleDesCheck(taskPassed){
        if(taskPassed.title != null && taskPassed.description != null) return true
        return false
    }
    static statusCheck(taskPassed){
        if(typeof(taskPassed.completionStatus) === "boolean")return true;
        return false
    }
    static priorityCheck(taskPassed){
        if(taskPassed.priority == 'low' || taskPassed.priority == 'medium' || taskPassed.priority == 'high') return true
        else{
            return false;
        }
    }
    static compareDates = (taskA, taskB) => {
        return new Date(taskB.createdAt) - new Date(taskA.createdAt);
      };
}

module.exports = validator;