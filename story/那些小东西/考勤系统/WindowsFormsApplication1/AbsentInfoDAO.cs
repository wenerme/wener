using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace AttendanceSystem
{
	/// <summary>
	///     用来存取 AbsendInfo 的对象
	/// </summary>
	public class AbsentInfoDAO
	{
		public const string DATAFILE = "data.json";
		private static AbsentInfoDAO _dao;
		public readonly string Filename;
		private List<AbsentInfo> InfoList;

		/// <summary>
		///     实例化存取对象
		/// </summary>
		/// <param name="filename">	存取的文件名 </param>
		private AbsentInfoDAO(string filename = DATAFILE)
		{
			Filename = filename;
			// 在初始化的时候 也同时读入内容
			if (File.Exists(filename))
			{
				using (var reader = new StreamReader(filename))
				{
					InfoList = JsonConvert.DeserializeObject<List<AbsentInfo>>(reader.ReadToEnd());
				}
			} else
				InfoList = new List<AbsentInfo>();
		}

		public static AbsentInfoDAO DAO
		{
			get { return _dao ?? (_dao = new AbsentInfoDAO()); }
		}

		public List<AbsentInfo> GetAll()
		{
			return InfoList;
		}

		public AbsentInfoDAO SaveInfo(AbsentInfo info)
		{
			if (! InfoList.Contains(info))
				InfoList.Add(info);
			return this;
		}

		public AbsentInfoDAO SaveInfo(IEnumerable<AbsentInfo> info)
		{
			InfoList.AddRange(info);
			InfoList = InfoList.Distinct().ToList();
			return this;
		}

		public AbsentInfoDAO SaveToFile()
		{
			using (var writer = new StreamWriter(Filename))
			{
				string content = JsonConvert.SerializeObject(InfoList, Formatting.Indented);
				writer.Write(content);
			}
			return this;
		}
	}
}