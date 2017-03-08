package web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import scala.collection.Iterator;
import scala.collection.immutable.List;

/**
 * Servlet implementation class mancalaServlet
 */
@WebServlet("/mancalaServlet")
public class mancalaServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public mancalaServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		//PrintWriter out = response.getWriter();
		//out.append("Served at: ").append(request.getContextPath());
		String rowA = request.getParameter("rowA").trim();
		String rowB = request.getParameter("rowB").trim();
		String mancalaA = request.getParameter("mancalaA").trim();
		String mancalaB = request.getParameter("mancalaB").trim();
		String isAI = request.getParameter("isAI").trim();
		List<String> result;
		if( isAI.equals("false")) {
			String moveID = request.getParameter("moveID").trim();
			result = mancala.Mancala.makeMove(rowA, rowB, mancalaA, mancalaB, moveID);
		}
		else {
			result = mancala.Mancala.runMancala("3", "0", "2", rowA, rowB, mancalaA, mancalaB);
		}
		StringBuilder joined = new StringBuilder();
		Iterator<String> itr = result.iterator();
		while( itr.hasNext()) {
			joined.append(itr.next()+";");
		}
		joined.deleteCharAt(joined.length()-1);
		response.setContentType("text/plain");
		response.getWriter().write(joined.toString());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
