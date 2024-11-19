
// Types
interface Course {
    id: string;
    code: string;
    name: string;
    credits: number;
    category: 'general' | 'specialized' | 'freeElective';
    subcategory?: string;
    prereq?: string;
}

interface CurriculumStructure {
    [key: string]: {
        name: string;
        required: number;
        subcategories?: {
            [key: string]: {
                name: string;
                required: number;
            };
        };
    };
}


interface GeneralCourse {
    code: string;
    name: string;
    credits: number;
    faculty: string;
    category: 'general';
    subcategory: 'wellness' | 'entrepreneurship' | 'language' | 'citizenship' | 'aesthetics' | 'extra';
}

// Default Courses Data
export const defaultRequiredCourses: Course[] = [
    { id: '01418111', code: '01418111', name: 'Introduction to Computer Science', credits: 3, prereq: '-', category: 'specialized', subcategory: 'required' },
    { id: '01418112', code: '01418112', name: 'Fundamental Programming Concepts', credits: 3, prereq: '01418111', category: 'specialized', subcategory: 'required' },
    { id: '01418113', code: '01418113', name: 'Computer Programming', credits: 3, prereq: '-', category: 'specialized', subcategory: 'required' },
    { id: '01418141', code: '01418141', name: 'Intellectual Properties and Professional Ethics', credits: 3, prereq: '-', category: 'specialized', subcategory: 'required' },
    { id: '01418211', code: '01418211', name: 'Software Construction', credits: 3, prereq: '01418113', category: 'specialized', subcategory: 'required' },
    { id: '01418221', code: '01418221', name: 'Fundamental of Database Systems', credits: 3, prereq: '01418113', category: 'specialized', subcategory: 'required' },
    { id: '01418231', code: '01418231', name: 'Data Structures', credits: 3, prereq: '01418113', category: 'specialized', subcategory: 'required' },
    { id: '01418232', code: '01418232', name: 'Algorithms Design and Analysis', credits: 3, prereq: '01418231', category: 'specialized', subcategory: 'required' },
    { id: '01418233', code: '01418233', name: 'Computer Architecture', credits: 3, prereq: '01418113', category: 'specialized', subcategory: 'required' },
    { id: '01418236', code: '01418236', name: 'Operating Systems', credits: 3, prereq: '01418233', category: 'specialized', subcategory: 'required' },
    { id: '01418261', code: '01418261', name: 'Fundamentals of AI', credits: 3, prereq: '-', category: 'specialized', subcategory: 'required' },
    { id: '01418321', code: '01418321', name: 'System Analysis and Design', credits: 3, prereq: '01418221', category: 'specialized', subcategory: 'required' },
    { id: '01418331', code: '01418331', name: 'Theory of Computation', credits: 3, prereq: '01418132', category: 'specialized', subcategory: 'required' },
    { id: '01418332', code: '01418332', name: 'Information System Security', credits: 3, prereq: '01418236', category: 'specialized', subcategory: 'required' },
    { id: '01418351', code: '01418351', name: 'Networks and Cloud Computing', credits: 3, prereq: '01418236', category: 'specialized', subcategory: 'required' },
    { id: '01418371', code: '01418371', name: 'Project Management and Digital Startup', credits: 3, prereq: '01418221', category: 'specialized', subcategory: 'required' },
    { id: '01418390', code: '01418390', name: 'Co-op. Education Preparation', credits: 1, prereq: '-', category: 'specialized', subcategory: 'required' },
    { id: '01418490', code: '01418490', name: 'Co-op. Education', credits: 6, prereq: '01418390', category: 'specialized', subcategory: 'required' },
    { id: '01418497', code: '01418497', name: 'Seminar', credits: 1, prereq: '-', category: 'specialized', subcategory: 'required' },
    { id: '01418499', code: '01418499', name: 'CS Project', credits: 3, prereq: '01418321', category: 'specialized', subcategory: 'required' }
];

export const defaultCoreCourses: Course[] = [
    { id: '01417111', code: '01417111', name: 'Calculus I', credits: 3, prereq: '-', category: 'specialized', subcategory: 'core' },
    { id: '01417322', code: '01417322', name: 'Basic Linear Algebra', credits: 3, prereq: '-', category: 'specialized', subcategory: 'core' },
    { id: '01418131', code: '01418131', name: 'Statistical Programming', credits: 3, prereq: '-', category: 'specialized', subcategory: 'core' },
    { id: '01418132', code: '01418132', name: 'Fundamentals of Computing', credits: 3, prereq: '-', category: 'specialized', subcategory: 'core' }
];


export const generalEducationCourses: Record<string, GeneralCourse> = {
    // กลุ่มสาระอยู่ดีมีสุข - พลศึกษา
    "01175111": { code: "01175111", name: "กรีฑาลู่-ลาน เพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175112": { code: "01175112", name: "แบดมินตันเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175113": { code: "01175113", name: "เทนนิสเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175114": { code: "01175114", name: "เทเบิลเทนนิสเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175115": { code: "01175115", name: "ฝึกสมาธิด้วยกิจกรรมยิงปืน", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175117": { code: "01175117", name: "ฝึกสมาธิด้วยกิจกรรมยิงธนู", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175118": { code: "01175118", name: "แชร์บอลเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175119": { code: "01175119", name: "เปตองเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175121": { code: "01175121", name: "บาสเกตบอลเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175122": { code: "01175122", name: "ฟุตบอลเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175123": { code: "01175123", name: "วอลเลย์บอลเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175124": { code: "01175124", name: "แฮนด์บอลเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175125": { code: "01175125", name: "ซอฟท์บอลเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175126": { code: "01175126", name: "ตะกร้อเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175127": { code: "01175127", name: "ฮอกกี้เพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175128": { code: "01175128", name: "รักบี้ฟุตบอลเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175129": { code: "01175129", name: "ฟุตซอลเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175131": { code: "01175131", name: "ว่ายน้ำเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175133": { code: "01175133", name: "กระโดดน้ำ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175134": { code: "01175134", name: "โปโลน้ำ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175141": { code: "01175141", name: "การเต้นแอโรบิกเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175142": { code: "01175142", name: "การเต้นรำพื้นเมืองเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175143": { code: "01175143", name: "การเต้นลีลาศเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175144": { code: "01175144", name: "รำไทยเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175151": { code: "01175151", name: "ศิลปะการป้องกันตัวและการต่อสู้ด้วยดาบไทย", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175152": { code: "01175152", name: "ศิลปะการป้องกันตัวและการต่อสู้ด้วยดาบสากล", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175153": { code: "01175153", name: "ศิลปะการป้องกันตัวและการต่อสู้ด้วยมวยไทย", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175154": { code: "01175154", name: "ศิลปะการป้องกันตัวและการต่อสู้ด้วยมวยสากล", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175155": { code: "01175155", name: "ศิลปะการป้องกันตัวและการต่อสู้ด้วยยูโด", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175156": { code: "01175156", name: "ศิลปะการป้องกันตัวและการต่อสู้ด้วยไอคิโด", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175157": { code: "01175157", name: "ศิลปะการป้องกันตัวและการต่อสู้ด้วยกระบี่กระบอง", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175159": { code: "01175159", name: "ศิลปะการป้องกันตัวและการต่อสู้ด้วยคาราเต้", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175161": { code: "01175161", name: "ฝึกสมองด้วยการเล่นบริดจ์", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175162": { code: "01175162", name: "โบว์ลิ่งเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175163": { code: "01175163", name: "กอล์ฟเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175164": { code: "01175164", name: "จักรยานเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175165": { code: "01175165", name: "การฝึกด้วยน้ำหนักเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175166": { code: "01175166", name: "ศิลปะการป้องกันตัวและการต่อสู้ด้วยเทควันโด", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175167": { code: "01175167", name: "โยคะเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175168": { code: "01175168", name: "การวิ่งเหยาะเพื่อสุขภาพ", credits: 1, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01175169": { code: "01175169", name: "การออกกำลังกายเพื่อพัฒนาสุขภาพแบบองค์รวม", credits: 2, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },

    // กลุ่มสาระอยู่ดีมีสุข - รายวิชาอื่นๆ
    "01173151": { code: "01173151", name: "เอดส์ศึกษา", credits: 2, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01174123": { code: "01174123", name: "ค่ายพักแรมนันทนาการ", credits: 2, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01174231": { code: "01174231", name: "นันทนาการเบื้องต้น", credits: 2, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01176141": { code: "01176141", name: "การวางแผนชีวิตและอาชีพสำหรับคนรุ่นใหม่", credits: 2, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "wellness" },
    "01350103": { code: "01350103", name: "ชีวิตยืดหยุ่นได้", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "wellness" },
    "01387101": { code: "01387101", name: "ศิลปะการอยู่ร่วมกับผู้อื่น", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "wellness" },
    "01387103": { code: "01387103", name: "ปรัชญาเศรษฐกิจพอเพียงกับพุทธศาสนา", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "wellness" },
    "01390103": { code: "01390103", name: "การท่องเที่ยวเพื่อความผาสุก", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "wellness" },
    "01402101": { code: "01402101", name: "การรู้เท่าทันผลิตภัณฑ์เสริมความงาม", credits: 3, faculty: "คณะวิทยาศาสตร์", category: "general", subcategory: "wellness" },
    "01416101": { code: "01416101", name: "พันธุศาสตร์ในสื่อ", credits: 3, faculty: "คณะวิทยาศาสตร์", category: "general", subcategory: "wellness" },
    "01418103": { code: "01418103", name: "สุขภาพและสังคมดิจิทัล", credits: 2, faculty: "คณะวิทยาศาสตร์", category: "general", subcategory: "wellness" },
    "01421201": { code: "01421201", name: "รังสี ชีวิต และสิ่งแวดล้อม", credits: 2, faculty: "คณะวิทยาศาสตร์", category: "general", subcategory: "wellness" },
    "01453102": { code: "01453102", name: "กฎหมายในชีวิตประจำวัน", credits: 3, faculty: "คณะสังคมศาสตร์", category: "general", subcategory: "wellness" },
    "01459101": { code: "01459101", name: "จิตวิทยาเพื่อชีวิตสมัยใหม่", credits: 3, faculty: "คณะสังคมศาสตร์", category: "general", subcategory: "wellness" },
    "01459102": { code: "01459102", name: "จิตวิทยากับความหลากหลายของมนุษย์", credits: 3, faculty: "คณะสังคมศาสตร์", category: "general", subcategory: "wellness" },
    "01999011": { code: "01999011", name: "อาหารเพื่อมนุษยชาติ", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "wellness" },
    "01999012": { code: "01999012", name: "สุขภาพเพื่อชีวิต", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "wellness" },
    "01999033": { code: "01999033", name: "ศิลปะการดำเนินชีวิต", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "wellness" },
    "01999036": { code: "01999036", name: "ความสุขในพลวัตของชีวิต", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "wellness" },
    "01999048": { code: "01999048", name: "นวัตกรรมเพื่อสิ่งแวดล้อมและสุขภาวะ", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "wellness" },
    "01999051": { code: "01999051", name: "การพัฒนาสมรรถนะหลักผ่านสุขภาพหนึ่งเดียว", credits: 2, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "wellness" },
    "01999213": { code: "01999213", name: "สิ่งแวดล้อม เทคโนโลยีและชีวิต", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "wellness" },

    // กลุ่มสาระศาสตร์แห่งผู้ประกอบการ
    "01005101": { code: "01005101", name: "เทคโนโลยีเกษตรสมัยใหม่", credits: 3, faculty: "คณะเกษตร", category: "general", subcategory: "entrepreneurship" },
    "01101101": { code: "01101101", name: "เศรษฐศาสตร์ทั่วไปในกระแสโลกาภิวัตน์", credits: 3, faculty: "คณะเศรษฐศาสตร์", category: "general", subcategory: "entrepreneurship" },
    "01131111": { code: "01131111", name: "การเงินสำหรับผู้ประกอบการ", credits: 3, faculty: "คณะบริหารธุรกิจ", category: "general", subcategory: "entrepreneurship" },
    "01177141": { code: "01177141", name: "การแสวงหาความรู้", credits: 3, faculty: "คณะศึกษาศาสตร์", category: "general", subcategory: "entrepreneurship" },
    "01200101": { code: "01200101", name: "การคิดเชิงนวัตกรรม", credits: 3, faculty: "คณะวิศวกรรมศาสตร์", category: "general", subcategory: "entrepreneurship" },
    "01242001": { code: "01242001", name: "การออกแบบและธุรกิจผลิตภัณฑ์แนวสร้างสรรค์", credits: 3, faculty: "คณะสถาปัตยกรรมศาสตร์", category: "general", subcategory: "entrepreneurship" },
    "01387105": { code: "01387105", name: "พุทธจริยศาสตร์ในการดำเนินธุรกิจ", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "entrepreneurship" },
    "01390104": { code: "01390104", name: "การพัฒนาบุคลิกภาพเพื่อการเป็นผู้ประกอบการสมัยใหม่", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "entrepreneurship" },
    "01418102": { code: "01418102", name: "เทคโนโลยีสารสนเทศเพื่อผู้ประกอบการ", credits: 3, faculty: "คณะวิทยาศาสตร์", category: "general", subcategory: "entrepreneurship" },
    "01453103": { code: "01453103", name: "กฎหมายสำหรับผู้ประกอบการใหม่", credits: 3, faculty: "คณะสังคมศาสตร์", category: "general", subcategory: "entrepreneurship" },
    "01999041": { code: "01999041", name: "เศรษฐศาสตร์เพื่อการดำเนินชีวิตที่ดี", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "entrepreneurship" },
    "01999043": { code: "01999043", name: "การคิดสร้างสรรค์เพื่อการจัดการคุณค่า", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "entrepreneurship" },
    "01999112": { code: "01999112", name: "แนวคิดเศรษฐกิจหมุนเวียนเพื่อความยั่งยืน", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "entrepreneurship" },

    // กลุ่มสาระภาษากับการสื่อสาร - ภาษาไทย
    "01361101": { code: "01361101", name: "การใช้ภาษาไทยเบื้องต้น", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01361102": { code: "01361102", name: "การเขียนภาษาไทยเชิงปฏิบัติ", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01361103": { code: "01361103", name: "การอ่านภาษาไทยเชิงวิจารณ์", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01999021": { code: "01999021", name: "ภาษาไทยเพื่อการสื่อสาร", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "language" },
    "01999022": { code: "01999022", name: "ภาษาไทยในบริบทวัฒนธรรม", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "language" },

    // กลุ่มสาระภาษากับการสื่อสาร - ภาษาต่างประเทศ
    "01354101": { code: "01354101", name: "ภาษาเขมรเพื่อการสื่อสาร I", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01354102": { code: "01354102", name: "ภาษาเขมรเพื่อการสื่อสาร II", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01354103": { code: "01354103", name: "ภาษาเขมรเพื่อการสื่อสาร III", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355101": { code: "01355101", name: "ภาษาอังกฤษในชีวิตประจำวัน", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355102": { code: "01355102", name: "ภาษาอังกฤษในมหาวิทยาลัย", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355103": { code: "01355103", name: "ภาษาอังกฤษเพื่อโอกาสในการทำงาน", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355104": { code: "01355104", name: "ภาษาอังกฤษสำหรับนิสิตเตรียมแพทย์ I", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355105": { code: "01355105", name: "ภาษาอังกฤษสำหรับนิสิตเตรียมแพทย์ II", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355106": { code: "01355106", name: "การสื่อสารภาษาอังกฤษทางการแพทย์", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355107": { code: "01355107", name: "ทักษะการเขียนภาษาอังกฤษที่จำเป็น", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355108": { code: "01355108", name: "ภาษาอังกฤษและวัฒนธรรมจากเพลง", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355109": { code: "01355109", name: "ทักษะการฟัง-การพูดภาษาอังกฤษที่จำเป็น", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355119": { code: "01355119", name: "ทักษะการอ่านภาษาอังกฤษที่จำเป็น", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355121": { code: "01355121", name: "คำและการออกเสียงในภาษาอังกฤษ", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355201": { code: "01355201", name: "การอ่านและเขียนภาษาอังกฤษอย่างมีวิจารณญาณ", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355202": { code: "01355202", name: "การเขียนรายงานภาษาอังกฤษ", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355203": { code: "01355203", name: "โครงสร้างภาษาอังกฤษ", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355204": { code: "01355204", name: "การนำเสนอโครงงานเป็นภาษาอังกฤษ", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355205": { code: "01355205", name: "การอ่านภาษาอังกฤษด้านสื่อสารมวลชน", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355206": { code: "01355206", name: "ภาษาอังกฤษวิชาการ", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355207": { code: "01355207", name: "การเขียนโต้ตอบภาษาอังกฤษ", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355208": { code: "01355208", name: "การพัฒนาทักษะภาษาอังกฤษผ่านเกม", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355209": { code: "01355209", name: "ภาษาอังกฤษเพื่อการสื่อสารในงานอาชีพ", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355303": { code: "01355303", name: "ภาษาอังกฤษเพื่อการสมัครงาน", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01355307": { code: "01355307", name: "ทักษะรวมภาษาอังกฤษเพื่อการสื่อสาร", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },

    // ภาษาฝรั่งเศส
    "01356101": { code: "01356101", name: "ภาษาฝรั่งเศสเบื้องต้น I", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01356102": { code: "01356102", name: "ภาษาฝรั่งเศสเบื้องต้น II", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01356103": { code: "01356103", name: "ภาษาฝรั่งเศสเบื้องต้น III", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01356104": { code: "01356104", name: "ภาษาฝรั่งเศสเบื้องต้น IV", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },

    // ภาษาเยอรมัน
    "01357101": { code: "01357101", name: "ภาษาเยอรมันเบื้องต้น I", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01357102": { code: "01357102", name: "ภาษาเยอรมันเบื้องต้น II", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01357103": { code: "01357103", name: "ภาษาเยอรมันเบื้องต้น III", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01357104": { code: "01357104", name: "ภาษาเยอรมันเบื้องต้น IV", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },

    // ภาษาญี่ปุ่น
    "01358101": { code: "01358101", name: "ภาษาญี่ปุ่นเบื้องต้น I", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01358102": { code: "01358102", name: "ภาษาญี่ปุ่นเบื้องต้น II", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01358103": { code: "01358103", name: "ภาษาญี่ปุ่นเบื้องต้น III", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01358104": { code: "01358104", name: "ภาษาญี่ปุ่นเบื้องต้น IV", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },

    // ภาษาจีน
    "01362101": { code: "01362101", name: "ภาษาจีน I", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01362102": { code: "01362102", name: "ภาษาจีน II", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01362201": { code: "01362201", name: "ภาษาจีน III", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01362202": { code: "01362202", name: "ภาษาจีน IV", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01362301": { code: "01362301", name: "ภาษาจีน V", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },

    // ภาษาเกาหลี
    "01395101": { code: "01395101", name: "ภาษาเกาหลีเพื่อการสื่อสาร I", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01395102": { code: "01395102", name: "ภาษาเกาหลีเพื่อการสื่อสาร II", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01395103": { code: "01395103", name: "ภาษาเกาหลีเพื่อการสื่อสาร III", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01395104": { code: "01395104", name: "ภาษาเกาหลีเพื่อการสื่อสาร IV", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01395105": { code: "01395105", name: "การอ่านและรายงานภาษาเกาหลี", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },

    // ภาษาเวียดนาม
    "01399101": { code: "01399101", name: "ภาษาเวียดนามเพื่อการสื่อสาร I", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01399102": { code: "01399102", name: "ภาษาเวียดนามเพื่อการสื่อสาร II", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01399103": { code: "01399103", name: "ภาษาเวียดนามเพื่อการสื่อสาร III", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01399104": { code: "01399104", name: "ภาษาเวียดนามเพื่อการสื่อสาร IV", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01399105": { code: "01399105", name: "การอ่านภาษาเวียดนาม", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01399106": { code: "01399106", name: "การฟัง-พูดภาษาเวียดนาม", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },

    // วิชาสารสนเทศ/คอมพิวเตอร์
    "01371111": { code: "01371111", name: "สื่อสารสนเทศเพื่อการเรียนรู้", credits: 1, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "language" },
    "01418101": { code: "01418101", name: "การใช้งานคอมพิวเตอร์", credits: 1, faculty: "คณะวิทยาศาสตร์", category: "general", subcategory: "language" },
    "01418104": {
        code: "01418104", name: "รู้ทันไอที", credits: 2, faculty: "คณะวิทยาศาสตร์", category: "general", subcategory: "language"
    },
    // วิชาสารสนเทศ/คอมพิวเตอร์ (ต่อ)
    "01418106": { code: "01418106", name: "ทักษะเทคโนโลยีดิจิทัล", credits: 3, faculty: "คณะวิทยาศาสตร์", category: "general", subcategory: "language" },
    "01999023": { code: "01999023", name: "ทักษะความเข้าใจและใช้เทคโนโลยีดิจิทัล", credits: 2, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "language" },
    "03600013": { code: "03600013", name: "เครื่องมือและทักษะทางคอมพิวเตอร์ที่จำเป็น", credits: 1, faculty: "คณะวิศวกรรมศาสตร์ ศรีราชา", category: "general", subcategory: "language" },
    "03752111": { code: "03752111", name: "ทรัพยากรสารสนเทศเพื่อการค้นคว้า", credits: 1, faculty: "คณะวิทยาการจัดการ", category: "general", subcategory: "language" },

    // กลุ่มสาระพลเมืองไทยและพลเมืองโลก - ศาสตร์แห่งแผ่นดิน
    "01999111": { code: "01999111", name: "ศาสตร์แห่งแผ่นดิน", credits: 2, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "citizenship" },

    // กลุ่มสาระพลเมืองไทยและพลเมืองโลก - รายวิชาอื่นๆ
    "01001317": { code: "01001317", name: "ผู้นำกับการพัฒนาภาคการเกษตร", credits: 3, faculty: "คณะเกษตร", category: "general", subcategory: "citizenship" },
    "01009102": { code: "01009102", name: "มนุษย์และทรัพยากรธรรมชาติ", credits: 3, faculty: "คณะเกษตร", category: "general", subcategory: "citizenship" },
    "01015202": { code: "01015202", name: "เกษตรวิถีไทย", credits: 3, faculty: "คณะเกษตร", category: "general", subcategory: "citizenship" },
    "01301101": { code: "01301101", name: "การอนุรักษ์ทรัพยากรและสิ่งแวดล้อม", credits: 3, faculty: "คณะวนศาสตร์", category: "general", subcategory: "citizenship" },
    "01350104": { code: "01350104", name: "ศิลปะการอ่านคน", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "citizenship" },
    "01390102": { code: "01390102", name: "การท่องเที่ยวเชิงสร้างสรรค์", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "citizenship" },
    "01453101": { code: "01453101", name: "สิทธิขั้นพื้นฐาน", credits: 3, faculty: "คณะสังคมศาสตร์", category: "general", subcategory: "citizenship" },
    "01455101": { code: "01455101", name: "การเมืองโลกในชีวิตประจำวัน", credits: 3, faculty: "คณะสังคมศาสตร์", category: "general", subcategory: "citizenship" },
    "01460101": { code: "01460101", name: "สังคมและวัฒนธรรมไทยร่วมสมัย", credits: 3, faculty: "คณะสังคมศาสตร์", category: "general", subcategory: "citizenship" },
    "01999013": { code: "01999013", name: "พลเมืองดิจิทัล", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "citizenship" },
    "01999031": { code: "01999031", name: "มรดกอารยธรรมโลก", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "citizenship" },
    "01999032": { code: "01999032", name: "ไทยศึกษา", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "citizenship" },
    "01999046": { code: "01999046", name: "การพัฒนาความมั่นคงแห่งชาติ", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "citizenship" },
    "01999047": { code: "01999047", name: "การทหารเพื่อการพัฒนาประเทศ", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "citizenship" },
    "01999141": { code: "01999141", name: "มนุษย์กับสังคม", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "citizenship" },

    // กลุ่มสาระสุนทรียศาสตร์
    "01007101": { code: "01007101", name: "พืชสวนเพื่อคุณภาพชีวิตและสิ่งแวดล้อม", credits: 2, faculty: "คณะเกษตร", category: "general", subcategory: "aesthetics" },
    "01240011": { code: "01240011", name: "การออกแบบในชีวิตประจำวัน", credits: 3, faculty: "คณะสถาปัตยกรรมศาสตร์", category: "general", subcategory: "aesthetics" },
    "01244101": { code: "01244101", name: "การออกแบบเพื่อความเป็นอยู่ที่ดี", credits: 3, faculty: "คณะสถาปัตยกรรมศาสตร์", category: "general", subcategory: "aesthetics" },
    "01255101": { code: "01255101", name: "มนุษย์กับทะเล", credits: 3, faculty: "คณะประมง", category: "general", subcategory: "aesthetics" },
    "01308101": { code: "01308101", name: "การท่องเที่ยวทางธรรมชาติอย่างยั่งยืน", credits: 3, faculty: "คณะวนศาสตร์", category: "general", subcategory: "aesthetics" },
    "01350102": { code: "01350102", name: "เล่าเรื่องด้วยภาพ", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "aesthetics" },
    "01387102": { code: "01387102", name: "ปรัชญาสำหรับชีวิตยุคใหม่", credits: 3, faculty: "คณะมนุษยศาสตร์", category: "general", subcategory: "aesthetics" },
    "01401201": { code: "01401201", name: "พืชเพื่อการสร้างคุณค่าชีวิต", credits: 3, faculty: "คณะวิทยาศาสตร์", category: "general", subcategory: "aesthetics" },
    "01418105": { code: "01418105", name: "ศิลปะสร้างสรรค์ดิจิทัล", credits: 3, faculty: "คณะวิทยาศาสตร์", category: "general", subcategory: "aesthetics" },
    "01420201": { code: "01420201", name: "อัญมณีและเครื่องประดับ", credits: 3, faculty: "คณะวิทยาศาสตร์", category: "general", subcategory: "aesthetics" },
    "01999034": { code: "01999034", name: "ศิลปวิจักษณ์", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "aesthetics" },
    "01999035": { code: "01999035", name: "วัฒนธรรมดนตรีกับชีวิต", credits: 3, faculty: "วิทยาลัยบูรณาการศาสตร์", category: "general", subcategory: "aesthetics" },
    "02708102": { code: "02708102", name: "วรรณกรรมกับวิทยาศาสตร์", credits: 3, faculty: "คณะศิลปศาสตร์และวิทยาศาสตร์", category: "general", subcategory: "aesthetics" },
    "02728102": { code: "02728102", name: "สารสีในงานศิลปะ", credits: 3, faculty: "คณะศิลปศาสตร์และวิทยาศาสตร์", category: "general", subcategory: "aesthetics" },
    "02999037": { code: "02999037", name: "ศิลปะแห่งสุนทรียศาสตร์เพื่อความสุข", credits: 3, faculty: "โครงการบูรณาการวิทยาเขตกำแพงแสน", category: "general", subcategory: "aesthetics" },
    "03600012": { code: "03600012", name: "เทคโนโลยีสีเขียว", credits: 3, faculty: "คณะวิศวกรรมศาสตร์ศรีราชา", category: "general", subcategory: "aesthetics" },
    "03654111": { code: "03654111", name: "สุนทรียศาสตร์ทางการกีฬา", credits: 3, faculty: "คณะวิทยาศาสตร์ศรีราชา", category: "general", subcategory: "aesthetics" }

};