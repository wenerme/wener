using System;

namespace AttendanceSystem
{
	/// <summary>
	///     缺课情况，包括：
	///     缺课日期、第几节课、课程名称、学生姓名、缺课类型（迟到、早退、请假及旷课）
	/// </summary>
	public class AbsentInfo
	{
		public DateTime AbsentDate { get; set; }
		public CourseTime CourseTime { get; set; }
		public string CourseName { get; set; }
		public string StudentName { get; set; }
		public AbsentType AbsentType { get; set; }
	}
}