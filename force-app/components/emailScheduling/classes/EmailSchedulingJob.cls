public with sharing class EmailSchedulingJob implements Queueable, Database.AllowsCallouts {

	private List<Course__c> courses { get; set; }
	private List<CourseRegistration__c> courseRegistrations { get; set; }

	public EmailSchedulingJob( List<Course__c> courses, List<CourseRegistration__c> courseRegistrations ) {
		this.courses = courses;
		this.courseRegistrations = courseRegistrations;
	}

	public void execute( QueueableContext context ) {
		List<Course__c> filteredCourses = EmailSchedulingHelper.removeCourses( this.courses, this.courseRegistrations );
		List<EmailSchedulingHelper.ScheduleModel> recipients = EmailSchedulingHelper.getEmailsToSend( filteredCourses, courseRegistrations );
		List<Messaging.SendEmailResult> emailResults = EmailSchedulingHelper.sendEmailToCourseRecipients( recipients );
		Map<Id, String> coursesWithErrors = EmailSchedulingHelper.getCoursesWithEmailErrors( this.courseRegistrations, emailResults );
		//EmailSchedulingHelper.createTasks( filteredCourses );
		EmailSchedulingHelper.updateCoursesWithEmailStatus( filteredCourses, coursesWithErrors );

	}
}