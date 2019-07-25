namespace AttendanceSystem
{
    partial class 信息查询窗口
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(信息查询窗口));
			this.btn查询 = new System.Windows.Forms.Button();
			this.btnExit = new System.Windows.Forms.Button();
			this.comboBox缺课类型 = new System.Windows.Forms.ComboBox();
			this.output = new System.Windows.Forms.RichTextBox();
			this.label2 = new System.Windows.Forms.Label();
			this.label3 = new System.Windows.Forms.Label();
			this.label4 = new System.Windows.Forms.Label();
			this.txtBox姓名 = new System.Windows.Forms.TextBox();
			this.txtBox课程 = new System.Windows.Forms.TextBox();
			this.时间 = new System.Windows.Forms.Label();
			this.label1 = new System.Windows.Forms.Label();
			this.chkEnableTimeLimit = new System.Windows.Forms.CheckBox();
			this.dtpStart = new System.Windows.Forms.DateTimePicker();
			this.dtpEnd = new System.Windows.Forms.DateTimePicker();
			this.dgvResults = new System.Windows.Forms.DataGridView();
			this.StudentName = new System.Windows.Forms.DataGridViewTextBoxColumn();
			this.CourseName = new System.Windows.Forms.DataGridViewTextBoxColumn();
			this.AbsentType = new System.Windows.Forms.DataGridViewComboBoxColumn();
			this.CourseTime = new System.Windows.Forms.DataGridViewComboBoxColumn();
			this.AbsentDate = new AttendanceSystem.CalendarColumn();
			this.cbbCourseTime = new System.Windows.Forms.ComboBox();
			this.label5 = new System.Windows.Forms.Label();
			this.btnAddInfo = new System.Windows.Forms.Button();
			this.calendarColumn1 = new AttendanceSystem.CalendarColumn();
			this.dataGridViewTextBoxColumn1 = new System.Windows.Forms.DataGridViewTextBoxColumn();
			this.dataGridViewTextBoxColumn2 = new System.Windows.Forms.DataGridViewTextBoxColumn();
			this.calendarColumn2 = new AttendanceSystem.CalendarColumn();
			((System.ComponentModel.ISupportInitialize)(this.dgvResults)).BeginInit();
			this.SuspendLayout();
			// 
			// btn查询
			// 
			this.btn查询.Font = new System.Drawing.Font("宋体", 9F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
			this.btn查询.Location = new System.Drawing.Point(346, 74);
			this.btn查询.Margin = new System.Windows.Forms.Padding(2);
			this.btn查询.Name = "btn查询";
			this.btn查询.Size = new System.Drawing.Size(52, 27);
			this.btn查询.TabIndex = 0;
			this.btn查询.Text = "查询";
			this.btn查询.UseVisualStyleBackColor = true;
			this.btn查询.Click += new System.EventHandler(this.button1_Click);
			// 
			// btnExit
			// 
			this.btnExit.Font = new System.Drawing.Font("宋体", 10.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
			this.btnExit.Location = new System.Drawing.Point(29, 355);
			this.btnExit.Margin = new System.Windows.Forms.Padding(2);
			this.btnExit.Name = "btnExit";
			this.btnExit.Size = new System.Drawing.Size(134, 30);
			this.btnExit.TabIndex = 1;
			this.btnExit.Text = "退出";
			this.btnExit.UseVisualStyleBackColor = true;
			this.btnExit.Click += new System.EventHandler(this.button2_Click);
			// 
			// comboBox缺课类型
			// 
			this.comboBox缺课类型.FormattingEnabled = true;
			this.comboBox缺课类型.Location = new System.Drawing.Point(96, 71);
			this.comboBox缺课类型.Margin = new System.Windows.Forms.Padding(2);
			this.comboBox缺课类型.Name = "comboBox缺课类型";
			this.comboBox缺课类型.Size = new System.Drawing.Size(117, 20);
			this.comboBox缺课类型.TabIndex = 5;
			// 
			// output
			// 
			this.output.Location = new System.Drawing.Point(12, 278);
			this.output.Margin = new System.Windows.Forms.Padding(2);
			this.output.Name = "output";
			this.output.Size = new System.Drawing.Size(544, 65);
			this.output.TabIndex = 7;
			this.output.Text = "";
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.BackColor = System.Drawing.Color.Transparent;
			this.label2.Font = new System.Drawing.Font("宋体", 10.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
			this.label2.Location = new System.Drawing.Point(9, 72);
			this.label2.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(71, 15);
			this.label2.TabIndex = 11;
			this.label2.Text = "缺课类型";
			// 
			// label3
			// 
			this.label3.AutoSize = true;
			this.label3.BackColor = System.Drawing.Color.Transparent;
			this.label3.Font = new System.Drawing.Font("宋体", 10.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
			this.label3.Location = new System.Drawing.Point(37, 14);
			this.label3.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(39, 15);
			this.label3.TabIndex = 12;
			this.label3.Text = "姓名";
			// 
			// label4
			// 
			this.label4.AutoSize = true;
			this.label4.BackColor = System.Drawing.Color.Transparent;
			this.label4.Font = new System.Drawing.Font("宋体", 10.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
			this.label4.Location = new System.Drawing.Point(362, 16);
			this.label4.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
			this.label4.Name = "label4";
			this.label4.Size = new System.Drawing.Size(39, 15);
			this.label4.TabIndex = 13;
			this.label4.Text = "课程";
			// 
			// txtBox姓名
			// 
			this.txtBox姓名.Location = new System.Drawing.Point(96, 10);
			this.txtBox姓名.Margin = new System.Windows.Forms.Padding(2);
			this.txtBox姓名.Name = "txtBox姓名";
			this.txtBox姓名.Size = new System.Drawing.Size(117, 21);
			this.txtBox姓名.TabIndex = 14;
			// 
			// txtBox课程
			// 
			this.txtBox课程.Location = new System.Drawing.Point(413, 12);
			this.txtBox课程.Margin = new System.Windows.Forms.Padding(2);
			this.txtBox课程.Name = "txtBox课程";
			this.txtBox课程.Size = new System.Drawing.Size(117, 21);
			this.txtBox课程.TabIndex = 14;
			// 
			// 时间
			// 
			this.时间.AutoSize = true;
			this.时间.BackColor = System.Drawing.Color.Transparent;
			this.时间.Font = new System.Drawing.Font("宋体", 10.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
			this.时间.Location = new System.Drawing.Point(9, 42);
			this.时间.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
			this.时间.Name = "时间";
			this.时间.Size = new System.Drawing.Size(71, 15);
			this.时间.TabIndex = 15;
			this.时间.Text = "起始时间";
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.BackColor = System.Drawing.Color.Transparent;
			this.label1.Font = new System.Drawing.Font("宋体", 10.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
			this.label1.Location = new System.Drawing.Point(332, 48);
			this.label1.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(71, 15);
			this.label1.TabIndex = 17;
			this.label1.Text = "截止时间";
			// 
			// chkEnableTimeLimit
			// 
			this.chkEnableTimeLimit.AutoSize = true;
			this.chkEnableTimeLimit.BackColor = System.Drawing.Color.Transparent;
			this.chkEnableTimeLimit.Location = new System.Drawing.Point(413, 80);
			this.chkEnableTimeLimit.Margin = new System.Windows.Forms.Padding(2);
			this.chkEnableTimeLimit.Name = "chkEnableTimeLimit";
			this.chkEnableTimeLimit.Size = new System.Drawing.Size(120, 16);
			this.chkEnableTimeLimit.TabIndex = 19;
			this.chkEnableTimeLimit.Text = "仅查询指定时间段";
			this.chkEnableTimeLimit.UseVisualStyleBackColor = false;
			// 
			// dtpStart
			// 
			this.dtpStart.Location = new System.Drawing.Point(96, 42);
			this.dtpStart.Margin = new System.Windows.Forms.Padding(2);
			this.dtpStart.Name = "dtpStart";
			this.dtpStart.Size = new System.Drawing.Size(117, 21);
			this.dtpStart.TabIndex = 20;
			// 
			// dtpEnd
			// 
			this.dtpEnd.Location = new System.Drawing.Point(413, 44);
			this.dtpEnd.Margin = new System.Windows.Forms.Padding(2);
			this.dtpEnd.Name = "dtpEnd";
			this.dtpEnd.Size = new System.Drawing.Size(117, 21);
			this.dtpEnd.TabIndex = 20;
			// 
			// dgvResults
			// 
			this.dgvResults.AllowUserToOrderColumns = true;
			this.dgvResults.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			this.dgvResults.Columns.AddRange(new System.Windows.Forms.DataGridViewColumn[] {
            this.StudentName,
            this.CourseName,
            this.AbsentType,
            this.CourseTime,
            this.AbsentDate});
			this.dgvResults.Location = new System.Drawing.Point(12, 123);
			this.dgvResults.Name = "dgvResults";
			this.dgvResults.RowTemplate.Height = 23;
			this.dgvResults.Size = new System.Drawing.Size(544, 150);
			this.dgvResults.TabIndex = 21;
			this.dgvResults.CellEndEdit += new System.Windows.Forms.DataGridViewCellEventHandler(this.dgvResults_CellEndEdit);
			this.dgvResults.CellValidating += new System.Windows.Forms.DataGridViewCellValidatingEventHandler(this.dgvResults_CellValidating);
			this.dgvResults.RowsAdded += new System.Windows.Forms.DataGridViewRowsAddedEventHandler(this.dgvResults_RowsAdded);
			this.dgvResults.UserDeletingRow += new System.Windows.Forms.DataGridViewRowCancelEventHandler(this.dgvResults_UserDeletingRow);
			// 
			// StudentName
			// 
			this.StudentName.DataPropertyName = "StudentName";
			this.StudentName.HeaderText = "学生姓名";
			this.StudentName.Name = "StudentName";
			// 
			// CourseName
			// 
			this.CourseName.DataPropertyName = "CourseName";
			this.CourseName.HeaderText = "课程名";
			this.CourseName.Name = "CourseName";
			// 
			// AbsentType
			// 
			this.AbsentType.DataPropertyName = "AbsentType";
			this.AbsentType.DisplayStyle = System.Windows.Forms.DataGridViewComboBoxDisplayStyle.ComboBox;
			this.AbsentType.HeaderText = "缺课类型";
			this.AbsentType.Name = "AbsentType";
			this.AbsentType.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.Automatic;
			// 
			// CourseTime
			// 
			this.CourseTime.DataPropertyName = "CourseTime";
			this.CourseTime.DisplayStyle = System.Windows.Forms.DataGridViewComboBoxDisplayStyle.ComboBox;
			this.CourseTime.HeaderText = "课程时间";
			this.CourseTime.Items.AddRange(new object[] {
            "1",
            "2",
            "3",
            "4"});
			this.CourseTime.Name = "CourseTime";
			this.CourseTime.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.Automatic;
			// 
			// AbsentDate
			// 
			this.AbsentDate.DataPropertyName = "AbsentDate";
			this.AbsentDate.HeaderText = "缺课日期";
			this.AbsentDate.Name = "AbsentDate";
			this.AbsentDate.Resizable = System.Windows.Forms.DataGridViewTriState.True;
			this.AbsentDate.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.Automatic;
			// 
			// cbbCourseTime
			// 
			this.cbbCourseTime.FormattingEnabled = true;
			this.cbbCourseTime.Location = new System.Drawing.Point(96, 99);
			this.cbbCourseTime.Margin = new System.Windows.Forms.Padding(2);
			this.cbbCourseTime.Name = "cbbCourseTime";
			this.cbbCourseTime.Size = new System.Drawing.Size(117, 20);
			this.cbbCourseTime.TabIndex = 5;
			// 
			// label5
			// 
			this.label5.AutoSize = true;
			this.label5.BackColor = System.Drawing.Color.Transparent;
			this.label5.Font = new System.Drawing.Font("宋体", 10.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
			this.label5.Location = new System.Drawing.Point(9, 100);
			this.label5.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
			this.label5.Name = "label5";
			this.label5.Size = new System.Drawing.Size(71, 15);
			this.label5.TabIndex = 11;
			this.label5.Text = "缺课课时";
			// 
			// btnAddInfo
			// 
			this.btnAddInfo.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(192)))), ((int)(((byte)(255)))), ((int)(((byte)(255)))));
			this.btnAddInfo.Font = new System.Drawing.Font("宋体", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(134)));
			this.btnAddInfo.Location = new System.Drawing.Point(191, 355);
			this.btnAddInfo.Margin = new System.Windows.Forms.Padding(2);
			this.btnAddInfo.Name = "btnAddInfo";
			this.btnAddInfo.Size = new System.Drawing.Size(86, 30);
			this.btnAddInfo.TabIndex = 22;
			this.btnAddInfo.Text = "信息录入";
			this.btnAddInfo.UseVisualStyleBackColor = false;
			this.btnAddInfo.Click += new System.EventHandler(this.btnAddInfo_Click);
			// 
			// calendarColumn1
			// 
			this.calendarColumn1.DataPropertyName = "AbsentDate";
			this.calendarColumn1.HeaderText = "缺课日期";
			this.calendarColumn1.Name = "calendarColumn1";
			this.calendarColumn1.Resizable = System.Windows.Forms.DataGridViewTriState.True;
			this.calendarColumn1.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.Automatic;
			// 
			// dataGridViewTextBoxColumn1
			// 
			this.dataGridViewTextBoxColumn1.DataPropertyName = "StudentName";
			this.dataGridViewTextBoxColumn1.HeaderText = "学生姓名";
			this.dataGridViewTextBoxColumn1.Name = "dataGridViewTextBoxColumn1";
			// 
			// dataGridViewTextBoxColumn2
			// 
			this.dataGridViewTextBoxColumn2.DataPropertyName = "CourseName";
			this.dataGridViewTextBoxColumn2.HeaderText = "课程名";
			this.dataGridViewTextBoxColumn2.Name = "dataGridViewTextBoxColumn2";
			// 
			// calendarColumn2
			// 
			this.calendarColumn2.DataPropertyName = "AbsentDate";
			this.calendarColumn2.HeaderText = "缺课日期";
			this.calendarColumn2.Name = "calendarColumn2";
			this.calendarColumn2.Resizable = System.Windows.Forms.DataGridViewTriState.True;
			this.calendarColumn2.SortMode = System.Windows.Forms.DataGridViewColumnSortMode.Automatic;
			// 
			// 信息查询窗口
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.BackgroundImage = ((System.Drawing.Image)(resources.GetObject("$this.BackgroundImage")));
			this.ClientSize = new System.Drawing.Size(572, 396);
			this.Controls.Add(this.btnAddInfo);
			this.Controls.Add(this.dgvResults);
			this.Controls.Add(this.dtpEnd);
			this.Controls.Add(this.dtpStart);
			this.Controls.Add(this.chkEnableTimeLimit);
			this.Controls.Add(this.label1);
			this.Controls.Add(this.时间);
			this.Controls.Add(this.txtBox课程);
			this.Controls.Add(this.txtBox姓名);
			this.Controls.Add(this.label4);
			this.Controls.Add(this.label3);
			this.Controls.Add(this.label5);
			this.Controls.Add(this.label2);
			this.Controls.Add(this.cbbCourseTime);
			this.Controls.Add(this.output);
			this.Controls.Add(this.comboBox缺课类型);
			this.Controls.Add(this.btnExit);
			this.Controls.Add(this.btn查询);
			this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
			this.Margin = new System.Windows.Forms.Padding(2);
			this.Name = "信息查询窗口";
			this.Text = "信息统计窗口";
			this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.信息查询窗口_FormClosing);
			this.Load += new System.EventHandler(this.form5_Load);
			((System.ComponentModel.ISupportInitialize)(this.dgvResults)).EndInit();
			this.ResumeLayout(false);
			this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button btn查询;
        private System.Windows.Forms.Button btnExit;
		private System.Windows.Forms.ComboBox comboBox缺课类型;
        private System.Windows.Forms.RichTextBox output;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox txtBox姓名;
        private System.Windows.Forms.TextBox txtBox课程;
        private System.Windows.Forms.Label 时间;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.CheckBox chkEnableTimeLimit;
        private System.Windows.Forms.DateTimePicker dtpStart;
        private System.Windows.Forms.DateTimePicker dtpEnd;
		private System.Windows.Forms.DataGridView dgvResults;
		private System.Windows.Forms.ComboBox cbbCourseTime;
		private System.Windows.Forms.Label label5;
		private System.Windows.Forms.DataGridViewTextBoxColumn dataGridViewTextBoxColumn1;
		private System.Windows.Forms.DataGridViewTextBoxColumn dataGridViewTextBoxColumn2;
		private CalendarColumn calendarColumn1;
		private System.Windows.Forms.Button btnAddInfo;
		private System.Windows.Forms.DataGridViewTextBoxColumn StudentName;
		private System.Windows.Forms.DataGridViewTextBoxColumn CourseName;
		private System.Windows.Forms.DataGridViewComboBoxColumn AbsentType;
		private System.Windows.Forms.DataGridViewComboBoxColumn CourseTime;
		private CalendarColumn AbsentDate;
		private CalendarColumn calendarColumn2;
    }
}